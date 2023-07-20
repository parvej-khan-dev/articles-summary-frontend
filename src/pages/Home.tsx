import { useEffect, useState } from "react";
import { Accordion } from "flowbite-react";
import { getAllArticlesSummary } from "../services/lisk-post-services";
import { FiLink2 } from "react-icons/fi";
import { LuSubtitles } from "react-icons/lu";
const Home = () => {
  interface DataInterface {
    title: string;
    url: string;
    content: string;
  }

  const [data, setData] = useState<DataInterface[]>([]);

  const loadData = async () => {
    let res = await getAllArticlesSummary();
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Get Any Articles Summary via links
        </p>
      </div>
      {data?.map((value, index) => (
        <Accordion key={index}>
          <Accordion.Panel className="my-10">
            <Accordion.Title>
              <p className="mb-3 flex justify-start items-center gap-2">
                {" "}
                <LuSubtitles /> {value?.title}
              </p>
              <p className="flex justify-start items-center gap-2">
                {" "}
                <FiLink2 /> {value?.url}
              </p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {value && value?.content}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ))}
    </div>
  );
};

export default Home;
