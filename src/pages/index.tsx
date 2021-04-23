export default function Home(props) {
  console.log("props", props);

  return (
    <></>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('http://0.0.0.0:3333/episodes')
  const data = await response.json();

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8,
  }
}