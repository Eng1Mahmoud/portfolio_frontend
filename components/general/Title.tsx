interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return (
    <div className="ml-[20px] mb-8">
      <h1 className=" tracking-[3px] text-3xl md:text-4xl font-bold">
        {title}
      </h1>
      <div className="relative mt-5 w-[150px] h-[5px] bg-blue-500/50 rounded-md">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500/90 rounded-md z-10"></div>
      </div>
    </div>
  );
};