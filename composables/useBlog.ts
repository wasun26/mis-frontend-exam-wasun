// export const useBlog = () => {
//   const runtimeConfig = useRuntimeConfig();
//   const accessToken = useCookie("accessToken");

//   const getBlogById = async (id: number) => {
//     const response = await fetch(`${runtimeConfig.public.apiBase}` + id, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken.value}`,
//       },
//     });
//     const data = await response.json();

//     if (response.status !== 200) {
//       useIToast().onError("ดึงข้อมูลไม่ได้");
//     }

//     return data;
//   };

//   return {
//     getBlogById,
//   };
// };

export const useBlog = () => {
  const accessToken = useCookie("accessToken");

  const runtimeConfig = useRuntimeConfig();

  // ดึงบทความทั้งหมด
  const getAllBlogs = async (query: any) => {
    try {
      const response = await $fetch<any>(
        `${runtimeConfig.public.apiBase}/api/blogs`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          query,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  };

  // ดึงบทความตาม ID
  const getBlogById = async (id: number) => {
    try {
      const response = await $fetch<any>(
        `${runtimeConfig.public.apiBase}/api/blogs/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      throw error;
    }
  };

  // สร้างบทความใหม่
  const createBlog = async (data: {
    title: string;
    content: string;
    blog_img?: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.blog_img) {
        formData.append("blog_img", data.blog_img);
      }

      const response = await $fetch<any>(
        `${runtimeConfig.public.apiBase}/api/blogs`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  };

  const updateBlog = async (
    id: number,
    data: { title?: string; content?: string; image?: File }
  ) => {
    try {
      const formData = new FormData();
      if (data.title) formData.append("title", data.title);
      if (data.content) formData.append("content", data.content);
      if (data.image) formData.append("blog_img", data.image);

      const response = await $fetch<any>(
        `${runtimeConfig.public.apiBase}/api/blogs/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  };

  // ลบบทความ
  const deleteBlog = async (id: number) => {
    try {
      await $fetch(`${runtimeConfig.public.apiBase}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  };

  // ลบรูปภาพบทความ
  const removeBlogImage = async (id: number) => {
    try {
      await $fetch(
        `${runtimeConfig.public.apiBase}/api/blogs/${id}/remove-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );
    } catch (error) {
      console.error("Error removing blog image:", error);
      throw error;
    }
  };

  // ลบบทความหลายรายการ
  const deleteMultipleBlogs = async (ids: number[]) => {
    try {
      await $fetch(`${runtimeConfig.public.apiBase}/api/blogs/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
        body: { ids },
      });
    } catch (error) {
      console.error("Error deleting multiple blogs:", error);
      throw error;
    }
  };

  return {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    removeBlogImage,
    deleteMultipleBlogs,
  };
};
