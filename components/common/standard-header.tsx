interface StandardHeaderProps {
  title: string;
}

function StandardHeader({ title }: StandardHeaderProps) {
  return (
    <h1 className="font-bold text-xl py-5 border-b border-b-black ">{title}</h1>
  );
}

export default StandardHeader;
