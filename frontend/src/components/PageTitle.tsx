type PageTitleProps = {
  title: string;
  subtitle: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="page__header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
