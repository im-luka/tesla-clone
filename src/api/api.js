export const getHomeData = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/home.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error when fetching home data!");
    }

    const data = await response.json();

    let products = [];
    for (const key in data) {
      products.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        img_desktop: data[key].img_desktop,
        img_mobile: data[key].img_mobile,
      });
    }

    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getCarModel = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/items/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error when fetching car model data!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSolarModel = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/solar/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error when fetching solar model data!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
