import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import CanvasStage from './components/CanvasStage';

export default function App() {
  const [elements, setElements] = useState([
    {
      id: 'carretera',
      type: 'road',
      x: 0,
      y: 260,
      width: 800,
      height: 80,
      rotation: 0,
      color: '#4b5563',
      isLocked: false
    }
  ]);
  const [selectedId, setSelectedId] = useState(null);

  // Maneja el evento de crear una carretera
  const handleAddRoad = () => {
    const newRoad = {
      id: `carretera-${Date.now()}`,
      type: 'road',
      x: 0, 
      y: 260,
      width: 800,
      height: 80,
      rotation: 0,
      color: '#4b5563',
      isLocked: false
    };
    
    setElements([...elements, newRoad]);
    setSelectedId(newRoad.id);
  };

  // Maneja el evento de añadir un coche
  // Utiliza un color random dentro de un array
  const handleAddCar = () => {

    const colors = [
      '#ef4444',
      '#3b82f6',
      '#10b981',
      '#8b5cf6',
      '#ec4899',
      '#06b6d4',
      '#64748b'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCar = {
      id: `vehiculo-${Date.now()}`,
      type: 'car',
      x: 400,
      y: 300,
      width: 90,
      height: 45,
      rotation: 0,
      color: randomColor
    };
    setElements([...elements, newCar]);
    setSelectedId(newCar.id);
  };

  // Maneja el evento de añadir un obstáculo
  const handleAddObstacle = () => {
    const newObstacle = {
      id: `referencia-${Date.now()}`,
      type: 'obstacle',
      x: 350,
      y: 200,
      width: 30,
      height: 30,
      rotation: 0,
      color: '#f59e0b'
    };
    setElements([...elements, newObstacle]);
    setSelectedId(newObstacle.id);
  };

  // Maneja el evento de remover de cualquier elemento seleccionado
  const deleteSelected = () => {
    if (selectedId) {

      setElements(elements.filter((el) => el.id !== selectedId));
      
      setSelectedId(null);
    }
  };

  // Eventos secundarios que permiten la escucha de atajos de teclado para la eliminación
  // de un elemento
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        setElements(prev => prev.filter((el) => el.id !== selectedId));
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  // Maneja el evento de hacer actualización de propiedades de un elemento, posición, rotación...
  const handleUpdateElement = (id, updatedProps) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updatedProps } : el));
  };

  // Maneja el evento de importar un JSON
  const handleImportJSON = (newElements) => {
    if (Array.isArray(newElements)) {

      setElements(newElements);

      setSelectedId(null);
    } else {
      alert("El archivo no contiene un esquema válido.");
    }
  };

  // Maneja el evento de descargar un JSON
  const handleDownloadJSON = () => {
    if (elements.length === 0) return;
    
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(elements, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `escena_accidente_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Sustituye la escena completa por la carretera principal
  const clearScene = () => {
    if (window.confirm("¿Seguro que quieres borrar todo el croquis y empezar de nuevo?")) {
      setElements([
        {
          id: 'carretera',
          type: 'road',
          x: 0,
          y: 260,
          width: 800,
          height: 80,
          rotation: 0,
          color: '#4b5563',
          isLocked: false 
        }
      ]);
      setSelectedId(null);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 font-sans overflow-hidden select-none">
      
      <Sidebar 
        elements={elements} 
        onAddCar={handleAddCar} 
        onAddObstacle={handleAddObstacle}
        onAddRoad={handleAddRoad}
        onDownloadJSON={handleDownloadJSON}
        onImportJSON={handleImportJSON}
        selectedId={selectedId}                
        onDeleteSelected={deleteSelected}
        onClearScene={clearScene}
      />

      <CanvasStage 
        elements={elements} 
        selectedId={selectedId}
        onSelectElement={setSelectedId}
        onUpdateElement={handleUpdateElement} 
      />
      
    </div>
  );
}