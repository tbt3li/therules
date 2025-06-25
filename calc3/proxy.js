export async function onRequest(context) {
  const url = "https://tb-bum.com/process_units_cp.php";

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const data = await response.text(); // or .json() if it’s JSON

  return new Response(data, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/html" // Change if response is JSON
    }
  });
}
