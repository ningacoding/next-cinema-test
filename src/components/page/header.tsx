export default function Header({children, title}: { title: string; children?: any }) {
  return (
    <div className="lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-10">
        {children}
      </div>
    </div>
  );
}
