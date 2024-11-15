import React, { useState, useContext } from "react";
import { FC } from "react";
import { CardContext } from "../App";

const Form: FC = () => {
  const { data, setData } = useContext(CardContext) ?? {};
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [timePosted, setTimePosted] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>([]);

  const handleSkillChange = (skill: string) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!setData || !data) return;

    const newData = [
      ...data,
      {
        id: Date.now(),
        logoURL: logoUrl,
        company,
        title,
        timePosted,
        jobType,
        location,
        isNew,
        isFeatured,
        tags: skills, // Add selected skills as tags
      },
    ];

    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <div className="w-[1110px] h-[300px] bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between border border-teal-200">
      <h2 className="text-xl font-semibold text-teal-700 mb-4">
        Vakansiya ma'lumotlarini kiriting
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8">
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-sm text-teal-700 mb-1">
                Logotip URL
              </label>
              <input
                type="text"
                placeholder="Logotip URL manzilini kiriting"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-teal-700 mb-1">
                Kompaniya nomi
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-teal-700">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="h-4 w-4"
                />
                Yangi
              </label>
              <label className="flex items-center gap-2 text-teal-700">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4"
                />
                Featured
              </label>
            </div>
            <div>
              <label className="block text-sm text-teal-700 mb-1">
                Lavozim
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex gap-4">
              <select
                value={timePosted}
                onChange={(e) => setTimePosted(e.target.value)}
                className="w-1/3 p-2 border border-teal-300 rounded-lg"
              >
                <option value="">Vaqt</option>
                <option value="1d ago">1 kun oldin</option>
                <option value="2d ago">2 kun oldin</option>
              </select>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-1/3 p-2 border border-teal-300 rounded-lg"
              >
                <option value="">Ish turi</option>
                <option value="Part Time">Yarim kun</option>
                <option value="Full Time">To‘liq kun</option>
              </select>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-1/3 p-2 border border-teal-300 rounded-lg"
              >
                <option value="">Joylashuv</option>
                <option value="Remote">Masofadan</option>
                <option value="On-site">Ofisda</option>
              </select>
            </div>
            {/* Add skills selection */}
            <div>
              <label className="block text-sm text-teal-700 mb-1">Skills</label>
              <div className="flex gap-4">
                {["Fullstack", "Midweight", "Python", "React"].map((skill) => (
                  <label key={skill} className="flex items-center gap-1 text-teal-700">
                    <input
                      type="checkbox"
                      checked={skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="h-4 w-4"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default Form;
