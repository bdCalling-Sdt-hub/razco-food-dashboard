const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={`text-xl ${className}`}>{children}</h2>;
};

export default Title;
