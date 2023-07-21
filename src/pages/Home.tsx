import { useEffect, useState } from "react";
// component from flowbite and tailwind
import { Accordion, Button, Modal } from "flowbite-react";

// import services from api services
import {
  deletePost,
  getAllArticlesSummary,
} from "../services/lisk-post-services";

// import icons from react icons
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiLink2 } from "react-icons/fi";
import { LuSubtitles } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  interface DataInterface {
    id: number;
    title: string;
    url: string;
    content: string;
  }

  const [data, setData] = useState<DataInterface[]>([]);
  const [openModal, setOpenModal] = useState(false); // its control model open and close
  const [postId, setPostId] = useState<number>(); // its take postId that require when we delete post

  //load all post data
  const loadData = async () => {
    try {
      let res = await getAllArticlesSummary();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  // delete post from home page when click on delete button
  const deletePostData = async (id: number) => {
    try {
      const res = await deletePost(id);

      if (res?.status === 200) {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOpenModal(false);
        loadData();
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // handle model open and closing functionality and set post id
  const handleModel = (id: number) => {
    setOpenModal(true);
    setPostId(id);
  };

  // render and load data when page is mounted
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      {/* hero section  */}
      <div className="mb-10">
        <h1 className="font-extrabold text-[#222328] text-[32px] ">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Get Any Articles Summary via links
        </p>
      </div>
      {/* post list render and iterate post via map */}
      {data?.map((value, index) => (
        <Accordion key={index} className="relative">
          <Accordion.Panel className="my-10 ">
            {/* delete post button */}
            <Button
              className="absolute right-16 top-8 bg-[#6469ff] text-white rounded-md hover:bg-black font-20 "
              onClick={() => handleModel(value?.id)}
            >
              <MdDelete
                size={22}
                color="white"
                title="delete"
                className="mr-2"
              />
              Delete
            </Button>
            <Accordion.Title>
              {/* post title  */}
              <p className="mb-3 flex justify-start items-center gap-2">
                <LuSubtitles /> {value?.title}{" "}
              </p>
              {/* post link & url */}
              <p className="flex justify-start items-center gap-2">
                {" "}
                <FiLink2 />{" "}
                <a href={value?.url} target="_blank">
                  {" "}
                  {value?.url}
                </a>
              </p>
            </Accordion.Title>
            {/* post content */}
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {value && value?.content}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ))}

      {/* confirmation model that open when we click on delete button */}
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Post?
            </h3>
            <div className="flex justify-center gap-4">
              {/* if user click on Yes button post delete successfully */}
              <Button color="success" onClick={() => deletePostData(postId)}>
                Yes, I'm sure
              </Button>
              {/* when user click on No model closed without delete post */}
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
