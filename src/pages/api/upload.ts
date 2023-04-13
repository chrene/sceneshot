import { Writable } from 'stream';

import formidable from 'formidable';
import imageSize from 'image-size';
import { NextApiRequest, NextApiResponse } from 'next';

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 2,
  allowEmptyFiles: false,
  multiples: false,
};

// promisify formidable
function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });
}
const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

interface ImageDimensions {
  width: number;
  height: number;
}
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const chunks: never[] = [];

    await formidablePromise(req, {
      ...formidableConfig,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });
    const contents = Buffer.concat(chunks);
    const { width, height } = imageSize(contents);
    res.status(200).json({ width, height });
  } catch (e) {
    // handle errors
    console.log(e);
    res.status(422).json({ error: 'error' });
  }
}

export default handler;
