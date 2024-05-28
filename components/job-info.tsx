export const JobInfo = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className='flex items-center gap-x-2'>
      {icon}
      {text}
    </div>
  );
};
