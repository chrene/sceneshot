export default function RenderIf({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) {
  if (condition) {
    return <>{children}</>;
  }
  return null;
}
