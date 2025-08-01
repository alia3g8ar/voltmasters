interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 text-sm text-gray-600">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <a href={item.href} className="hover:text-blue-600">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">←</span>}
        </span>
      ))}
    </nav>
  );
}