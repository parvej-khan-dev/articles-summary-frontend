import axios from "axios";
import { BACKEND_API } from "../../backend";

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
  }
};

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
