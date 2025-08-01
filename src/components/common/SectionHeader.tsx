interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}