import Movie from './(components)/Movie'

export default function MoviePage({ params }: any) {
  return <Movie slug={params.slug} />
}
