export const useBlog = () => {
  const getBlogById = async (id: number) => {
    const response = await fetch(
      "https://exam-api.dev.mis.cmu.ac.th/api/blogs/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      useIToast().onError("ดึงข้อมูลไม่ได้");
    }

    return data;
  };

  return {
    getBlogById,
  };
};
