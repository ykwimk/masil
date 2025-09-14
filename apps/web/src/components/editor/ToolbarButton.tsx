interface ToolbarButtonProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function ToolbarButton({
  children,
  active,
  disabled,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`cursor-pointer rounded border px-2 py-1 text-xs ${
        active ? 'bg-primary text-white' : 'hover:bg-muted bg-white'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
