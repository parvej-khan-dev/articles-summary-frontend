import axios from "axios";
import { BACKEND_API } from "../../backend";

// Api request handle that take array of link and payload and Give summaries articles in response
export const linkPost = async (payload: any) => {
  try {
    const axiosRes = await axios({
      method: "post",
      url: `${BACKEND_API}/articles/create-summary`,
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
      //   },
      data: { links: payload },
    });

    console.log("axiosRes=========", axiosRes);

    return axiosRes;
  } catch (err) {
    console.log("Some issue while posting - ", err);
    return err;
  }
};
// get all post api connection with axios
export const getAllArticlesSummary = async () => {
  try {
    const axiosRes = await axios({
      method: "get",
      url: `${BACKEND_API}/articles`,
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
      //   },
    });
    return axiosRes.data;
  } catch (err) {
    console.log("Some issue while getting Articles  - ", err);
  }
};

// delete post from database connection
export const deletePost = async (id: number) => {
  try {
    const axiosRes = await axios({
      method: "delete",
      url: `${BACKEND_API}/articles/${id}`,
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
      //   },
    });

    console.log("axiosRes=========", axiosRes);

    return axiosRes;
  } catch (err) {
    console.log("Some issue while posting - ", err);
  }
};
