const MapBox = () => {
  return (
    <div className="map-canvas">
      <iframe
        src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62222.739856555556!2d80.19095667346174!3d12.912783423521232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b8c90befe2b%3A0x170ab8b5b21bb530!2sSathyabama%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1726634651361!5m2!1sen!2sin"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapBox;
