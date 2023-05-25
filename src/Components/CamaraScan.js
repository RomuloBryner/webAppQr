import React, { useState, useRef, useEffect } from 'react';
import './CamaraScan.css';
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { Header } from './Header';
import { Html5QrcodeScanner } from 'html5-qrcode';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const scannerRef = useRef(null);

  let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(400, 400);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);

    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: qrboxFunction,
      fps: 5,
    });

    scanner.render(success, error);

    scannerRef.current = scanner;
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current.stop();
      scannerRef.current = null;
    }
  };

  const restartScanner = () => {
    setScanResult(null);
    setUsuarioEncontrado(false);
    startScanner();
  };

  const success = (result) => {
    setScanResult(result);
    buscarUsuario(result); // Llamada a la función para buscar el usuario en la base de datos
  };

  const error = (err) => {
    console.warn(err);
  };

  const buscarUsuario = (codigo) => {
    const usuariosRef = collection(firestore, 'usuarios');
    const usuariosAcreditadoRef = collection(firestore, 'usuarios_acreditado');

    // Buscar en la colección 'usuarios'
    getDoc(doc(usuariosRef, codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log('Usuario encontrado:', snapshot.data());
          setUsuarioEncontrado(true);
          // Realizar acciones adicionales con los datos del usuario si es necesario
        } else {
          // Si no se encuentra en 'usuarios', buscar en 'usuarios_acreditado'
          getDoc(doc(usuariosAcreditadoRef, codigo))
            .then((snapshot) => {
              if (snapshot.exists()) {
                console.log('Usuario encontrado:', snapshot.data());
                setUsuarioEncontrado(true);
                // Realizar acciones adicionales con los datos del usuario si es necesario
              } else {
                console.log('Usuario no encontrado');
                setUsuarioEncontrado(false);
              }
            })
            .catch((error) => {
              console.log('Error al buscar en la colección "usuarios_acreditado":', error);
              setUsuarioEncontrado(false);
            });
        }
      })
      .catch((error) => {
        console.log('Error al buscar en la colección "usuarios":', error);
        setUsuarioEncontrado(false);
      });
  };

  return (
    <div className="camarascan">
      <Header />
      <div className="hero2">
        <div className="result">
          <h1>Qr Code Scan by Web Cam</h1>
          {usuarioEncontrado ? <p>Usuario encontrado</p> : <p>Usuario no encontrado</p>}
          {!scanResult && usuarioEncontrado && (
            <button onClick={restartScanner}>Reiniciar</button>
          )}
        </div>
        <div className="scan">
          {scanResult ? (
            <div>
              <p>Success</p>
            </div>
          ) : (
            <div id="reader"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
