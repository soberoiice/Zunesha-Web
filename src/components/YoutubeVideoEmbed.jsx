import { Box } from "@chakra-ui/react";

const YouTubeEmbed = ({ url }) => {
  const videoId = url.split("/").pop();
  return (
    <Box
      mx={"auto"}
      w={{ base: "90%", lg: "auto" }}
      height={{ lg: "270px", base: "auto" }}
    >
      <iframe
        height={"100%"}
        width={"100%"}
        style={{
          aspectRatio: 16 / 9,
          borderRadius: "12px",
        }}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Box>
  );
};

// Usage
<YouTubeEmbed url="https://youtu.be/2GU7Ye78h6E" />;
export default YouTubeEmbed;
