import { Rect, Circle } from 'react-konva';
import React from 'react';

export default function SceneElement({ data, onUpdate, onSelect }) {
  
    // Propiedades comunes de las piezas
    const commonProps = {
        id: data.id,
        x: data.x,
        y: data.y,
        rotation: data.rotation,
        fill: data.color,
        draggable: true,
        onClick: () => onSelect(data.id),
        onTap: () => onSelect(data.id),
        
        onDragEnd: (e) => {
            onUpdate(data.id, {
                x: e.target.x(),
                y: e.target.y()
            });
        },

        onTransformEnd: (e) => {
            const node = e.target;

            onUpdate(data.id, {
                x: node.x(),
                y: node.y(),
                rotation: node.rotation(),
                width: node.width() * node.scaleX(),
                height: node.height() * node.scaleY()
            });

            node.scaleX(1);
            node.scaleY(1);
        }
    };

    if (data.type === 'car') {
        return (
            <Rect
                {...commonProps}
                width={data.width}
                height={data.height}
                cornerRadius={4}
                offsetX={data.width / 2}
                offsetY={data.height / 2}
            />
        );
    }

    if (data.type === 'obstacle') {
        return (
            <Circle
                {...commonProps}
                radius={data.width / 2}
                offsetX={0}
                offsetY={0}
            />
        );
    }

    // Las carreteras no comparten esas propiedades comúnes
    if (data.type === 'road') {
        return (
            <React.Fragment key={data.id}>
                <Rect
                    id={data.id}
                    x={data.x}
                    y={data.y}
                    width={data.width}
                    height={data.height}
                    fill={data.color}
                    rotation={data.rotation}
                    draggable={true}
                    
                    onClick={(e) => {
                        e.cancelBubble = true;
                        onSelect(data.id);
                    }}

                    onTap={(e) => {
                        e.cancelBubble = true;
                        onSelect(data.id);
                    }}
                    
                    onDragEnd={(e) => {

                        onUpdate(data.id, {
                            x: Math.round(e.target.x()),
                            y: Math.round(e.target.y())
                        });
                    }}
                    onTransformEnd={(e) => {
                        const node = e.target;

                        onUpdate(data.id, {
                            x: Math.round(node.x()),
                            y: Math.round(node.y()),
                            rotation: Math.round(node.rotation()),
                            width: Math.round(node.width() * node.scaleX()),
                            height: Math.round(node.height() * node.scaleY())
                        });

                        node.scaleX(1);
                        node.scaleY(1);
                    }}
                />
                
                <Rect
                    x={data.x}
                    y={data.y}
                    width={data.width}
                    height={4}
                    offsetY={-(data.height / 2) + 2} 
                    fill="#ffffff"
                    rotation={data.rotation}
                    dash={[15, 15]}
                    listen={false}
                />
            </React.Fragment>
        );
    }

    return null;
}