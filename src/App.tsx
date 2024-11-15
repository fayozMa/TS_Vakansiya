import React, { FC, createContext, useEffect, useState } from "react";
import Card from "./components/Card";
import Form from "./components/Form";

interface JobContextType {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const CardContext = createContext<JobContextType | undefined>(undefined);

const App: FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <CardContext.Provider value={{ data, setData }}>
      <img className="w-full" src="../Gradient.png" alt="" />
      <div className="mx-auto w-[1110px]">
        <div className="mt-16">
          <Form />
        </div>
        <div className="mt-16 flex flex-col gap-6">
          {data.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
    </CardContext.Provider>
  );
};

export default App;
