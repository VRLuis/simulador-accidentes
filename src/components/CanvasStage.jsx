import { useRef, useEffect } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import SceneElement from './SceneElement';

export default function CanvasStage({ elements, onUpdateElement, selectedId, onSelectElement }) {
  const transformerRef = useRef(null);
  const stageRef = useRef(null);

  // Busca el elemento seleccionado que coincide con ese id
  useEffect(() => {
    if (transformerRef.current) {
      if (selectedId) {

        const selectedNode = stageRef.current.findOne('#' + selectedId);
        if (selectedNode) {
          transformerRef.current.nodes([selectedNode]);
          transformerRef.current.getLayer().batchDraw();
          return;
        }
      }

      transformerRef.current.nodes([]);
    }
  }, [selectedId, elements]);

  // En el caso de que seleccionemos en el lienzo en blanco se deseleccionará cualquier elemento
  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      onSelectElement(null);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6 h-full">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300">
        
        <Stage 
          width={800} 
          height={600} 
          ref={stageRef}
          onMouseDown={handleStageClick}
        >
          <Layer>

            {elements.map((el) => (
              <SceneElement 
                key={el.id} 
                data={el} 
                onUpdate={onUpdateElement} 
                onSelect={onSelectElement}
              />
            ))}

            <Transformer
                ref={transformerRef}
                enabledAnchors={
                    // Definimos como queremos qeu se estiren los elementos
                    // El de carretera es diferente a todos los demás
                    elements.find(el => el.id === selectedId)?.type === 'road'
                    ? ['middle-left', 'middle-right', 'top-center', 'bottom-center']
                    : ['top-left', 'top-right', 'bottom-left', 'bottom-right']
                }
                rotateEnabled={true}
                boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 20) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
          </Layer>
        </Stage>

      </div>
    </div>
  );
}