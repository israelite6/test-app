export async function fetchApi({ url, method, data, ...props }) {
  const options = {
    headers: { "Content-Type": "application/json" },
  };

  if (
    method &&
    (String(method).toLowerCase() === "post" ||
      String(method).toLowerCase() === "put")
  ) {
    Object.assign(options, { body: JSON.stringify(data), method });
  }

  try {
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function graphqlApi({ query, data, ...props }) {
  const body = { query, variables: data || {} };

  try {
    const response = await fetchApi({
      url: "http://localhost:8085/v1/graphql",
      method: "post",
      data: body,
    });
    if (response.errors) {
      throw response.errors.map((error) => error.message).join(" ");
    }
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
