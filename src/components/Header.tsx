import React from "react";

interface Props {
  category: string;
  title: string;
}

const Header = ({ category, title }: Props) => {
  return (
    <div className="mb-10 pl-4 md:pl-0">
      <p className="text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </p>
    </div>
  );
};

export default Header;
