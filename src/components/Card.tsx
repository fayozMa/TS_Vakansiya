import { FC, useContext } from "react";
import { CardContext } from "../App";

type JobCardProps = {
  id: number; // Add an id to each job card to uniquely identify it for deletion
  logoURL: string;
  company: string;
  title: string;
  timePosted: string;
  jobType: string;
  location: string;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
};

const JobCard: FC<JobCardProps> = ({
  id,
  logoURL,
  company,
  title,
  timePosted,
  jobType,
  location,
  isNew,
  isFeatured,
  tags,
}) => {
  const { data, setData } = useContext(CardContext) ?? {};

  const handleDelete = () => {
    if (!setData || !data) return;

    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-lg rounded-lg border-l-4 border-blue-500">
      <div className="flex items-center">
        <img className="w-12 h-12" src={logoURL} alt="Logo" />
        <div className="ml-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-teal-600">{company}</span>
            {isNew && (
              <span className="text-xs text-white bg-teal-500 px-2 py-1 rounded-full">
                NEW!
              </span>
            )}
            {isFeatured && (
              <span className="text-xs text-white bg-gray-800 px-2 py-1 rounded-full">
                FEATURED
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="text-gray-500 text-sm">
            {timePosted} • {jobType} • {location}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm text-teal-600 bg-teal-100 px-2 py-1 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={handleDelete}
        className="mt-4 md:mt-0 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default JobCard;
