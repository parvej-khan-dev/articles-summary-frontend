import { useState } from "react";
import { FormField } from "../components";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { linkPost } from "../services/lisk-post-services";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

const CreatePost = () => {
  const navigate = useNavigate();
  type LinksArray = string[];
  const [addLinks, setAddLinks] = useState<LinksArray>([""]); // Initialize with one empty input field
  const [fieldValidations, setFieldValidations] = useState<boolean[]>([true]); // Initialize with true to indicate valid fields
  const maxLinks = 5; // Set the maximum number of input fields allowed
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    const updatedLinks: LinksArray = [...addLinks];
    updatedLinks[index] = value;
    setAddLinks(updatedLinks);

    // Update the field validation status for the changed field
    const updatedValidations: boolean[] = [...fieldValidations];
    updatedValidations[index] = value.trim() !== ""; // Set to true if not empty, otherwise false
    setFieldValidations(updatedValidations);
  };

  // its send api request for article summarizer when click on submit button
  const handleSubmit = (paylaod: string[]) => {
    linkPost(paylaod)
      .then((res: any) => {
        setLoading(true);
        if (res?.status === 201) {
          // show toast when articles summarizer successfully
          toast(res?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        // show toast when we getting any error during article summarizer api from link
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // add Form Field when click on plus button
  const handleAddLink = () => {
    if (addLinks.length < maxLinks) {
      // Check if the last field is not empty before adding a new field
      if (addLinks[addLinks.length - 1].trim() !== "") {
        setAddLinks([...addLinks, ""]);

        setFieldValidations([...fieldValidations, true]); // Add a new validation status for the new field
      } else {
        // If the last field value is empty, show an alert message

        toast.warn(
          "Please fill in the current field before adding a new one.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    }
  };

  // Remove Form Field when click on minus button
  const removeHandleLink = (index: number) => {
    setAddLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks.splice(index, 1);
      return updatedLinks;
    });
    setFieldValidations((prevValidations) => {
      const updatedValidations = [...prevValidations];
      updatedValidations.splice(index, 1);
      return updatedValidations;
    });
  };

  return (
    <section>
      {/* loader that show when we click on submit button */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Button>
            <Spinner aria-label="Spinner button example" />
            <span className="pl-3">Wait your Article is Summarizing ...</span>
          </Button>
        </div>
      ) : (
        <>
          {/* iterate input field till to max length for now its 5 */}
          {addLinks.map((link, index) => (
            <div className="flex items-center gap-2 mb-2" key={index}>
              <div className="mt-6 w-10/12">
                <FormField
                  labelName={`Article Link ${index + 1}`}
                  name={`link-${index}`}
                  value={link}
                  handleChange={(e: any) => handleChange(index, e.target.value)}
                />
              </div>
              {/*  its check first field show without value and check value of 
               input field value before insert new field */}
              {index === 0 ? (
                // add form field button
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="mt-[45px] text-white bg-[#4649ff] font-medium w-full rounded-md text-sm sm:w-auto px-5 py-2.5 h-10 text-center"
                >
                  <FiPlusCircle size={20} />
                </button>
              ) : (
                // remove Form input field Button
                <button
                  type="button"
                  onClick={() => removeHandleLink(index)}
                  className="mt-[45px] text-white bg-[#4649ff] font-medium w-full rounded-md text-sm sm:w-auto px-5 py-2.5 h-10 text-center"
                >
                  <FiMinusCircle size={20} />
                </button>
              )}
            </div>
          ))}
          {/* link submit button  */}
          <button
            className="mt-6 font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
            // disabled={!canShowAdditionalFields}
            onClick={() => handleSubmit(addLinks)}
          >
            Submit
          </button>
        </>
      )}
    </section>
  );
};

export default CreatePost;
