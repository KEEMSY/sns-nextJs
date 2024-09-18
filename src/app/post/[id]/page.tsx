import PostDetail from '../../../components/PostDetail'

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-black min-h-screen">
      <PostDetail postId={params.id} />
    </div>
  )
}