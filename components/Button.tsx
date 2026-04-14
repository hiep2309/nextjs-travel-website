import Image from "next/image";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  disabled?: boolean; // Thêm dòng này để sửa lỗi Property 'disabled' does not exist
}

const Button = ({ type, title, icon, variant, full, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
  )
}

export default Button;