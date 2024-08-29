import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

function App() {
  const [value, setValue] = useState();
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
  };

  return (
    <div className="App">
      <center>
        <br />
        <br />
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value of Qr-code"
        />
        <br />
        <br />
        <input
          type="text"
          onChange={(e) => setBack(e.target.value)}
          placeholder="Background color"
        />
        <br />
        <br />
        <input
          type="text"
          onChange={(e) => setFore(e.target.value)}
          placeholder="Foreground color"
        />
        <br />
        <br />
        <input
          type="number"
          onChange={(e) =>
            setSize(parseInt(e.target.value === "" ? 0 : e.target.value, 10))
          }
          placeholder="Size of Qr-code"
        />
        <br />
        <br />
        <br />
        {value && (
          <div ref={qrRef}>
            <QRCode
              value={value}
              bgColor={back}
              fgColor={fore}
              size={size === "" ? 0 : size}
            />
          </div>
        )}
        <br />
        <br />
        <button onClick={downloadQRCode}>Download QR Code</button>
      </center>
    </div>
  );
}

export default App;
