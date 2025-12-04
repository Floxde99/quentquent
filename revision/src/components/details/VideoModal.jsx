import React from "react";
import Modal from "../Modal/Modal";

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!video || !video.key) return null;

  const youtubeUrl = `https://www.youtube.com/embed/${video.key}?autoplay=1&vq=hd1080`;

  return (
    <Modal open={isOpen} onClose={onClose} title={video.name || "Vidéo"} className="modal-video" hideFooter={true}>
      <div className="video-modal__player">
        <iframe
          width="100%"
          height="500"
          src={youtubeUrl}
          title={video.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Modal>
  );
};

export default VideoModal;
