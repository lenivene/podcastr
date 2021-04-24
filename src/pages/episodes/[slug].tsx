import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../../services/api"
import { convertDurationTimeToString } from "../../utils/convertDurationTimeToString";
import styles from "../../styles/pages/episodes.module.scss";
import Link from "next/link";

type EpisodesType = {
  id: string,
  title: string,
  description: string,
  url: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration: number,
  durationAsString: string
}

type EpisodeProps = {
  episode: EpisodesType;
}


export default function Episode({ episode }: EpisodeProps){
  console.log("episode", episode);

  return (
    <div className={styles.episodesPage}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio"/>
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{__html: episode.description}}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await api.get(`/episodes/${context.params.slug}`);
  const data = response.data;

  const episode = {
    id: data.id,
    title: data.title,
    description: data.description,
    url: data.file.url,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationTimeToString(Number(data.file.duration))
  };

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}