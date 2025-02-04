interface EventPageProps {
  params: {
    slug: string;
  };
}

const EventPage = ({ params }: EventPageProps) => {
  const { slug } = params;
  return <div>{slug}</div>;
};

export default EventPage;
