interface LabelProps {
  children: React.ReactNode;
  title: string;
  htmlFor?: string;
  required?: boolean;
}

const Label = ({ children, title, htmlFor, required }: LabelProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {required && (
          <span className="mr-1 text-red-600" aria-hidden>
            *
          </span>
        )}
        {title}
      </label>
      {children}
    </>
  );
};

export { Label };
