import { useRef } from 'react';

export default function Sidebar({ 
  elements, 
  onAddCar, 
  onAddObstacle, 
  onAddRoad,
  onDownloadJSON, 
  onImportJSON,
  selectedId,     
  onDeleteSelected ,
  onClearScene 
}) {
    const fileInputRef = useRef(null);

    // Maneja cuando el fichero cambia
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsedJson = JSON.parse(event.target.result);
                
                if (Array.isArray(parsedJson)) {
                    onImportJSON(parsedJson);
                } else {
                    alert("Formato JSON incorrecto.");
                }
            } catch {
                alert("Error al leer el archivo JSON.");
            }
        };

        reader.readAsText(file);
        e.target.value = '';
    };

    return (
        <div className="w-80 bg-white p-6 border-r border-gray-200 flex flex-col gap-5 h-full overflow-hidden shadow-md z-10">
        <div>
            <h2 className="text-xl font-bold text-gray-800">Simulación de Accidentes</h2>
        </div>
        
            <div className="flex flex-col gap-2 cursor-pointer">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Añadir a la escena</p>

                <button 
                    onClick={onAddRoad}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm text-sm text-left flex items-center gap-2 cursor-pointer"
                >
                    <span className="w-4 h-3 bg-slate-400 border border-dashed border-white rounded-sm"></span>
                    Añadir Tramo Carretera
                </button>

                <button 
                    onClick={onAddCar}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm text-sm text-left flex items-center gap-2 cursor-pointer">
                    <span className="w-4 h-2.5 bg-white rounded-sm"></span>
                    Añadir Vehículo
                </button>

                <button 
                    onClick={onAddObstacle}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm text-sm text-left flex items-center gap-2 cursor-pointer">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    Añadir Obstáculo
                </button>

            </div>

            <div className="flex flex-col gap-2 cursor-pointer">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Utilidades para la Escena</p>

                <button 
                onClick={onDownloadJSON}
                disabled={elements.length === 0}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg shadow-md text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                    Descargar Escena (.json)
                </button>

                <button 
                onClick={() => fileInputRef.current.click()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                    Insertar Escena (.json)
                </button>

                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
            </div>

            <div className="flex flex-col gap-2 cursor-pointer">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Edición de Objetos</p>
                
                <button
                    onClick={onDeleteSelected}
                    disabled={!selectedId}
                    className="w-full text-sm font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer
                    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border disabled:border-gray-200
                    bg-red-600 hover:bg-red-700 text-white"
                >
                    Eliminar Seleccionado
                </button>

                <button
                    onClick={onClearScene}
                    disabled={elements.length === 0} 
                    className="w-full text-sm font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border
                    disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-100
                    border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium"
                >
                    Limpiar Escena Completa
                </button>
            </div>

        <div className="flex-grow flex flex-col gap-1 min-h-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Visualizar JSON</p>
            <div className="flex-grow bg-slate-900 rounded-lg p-3 overflow-auto border border-slate-800">
            <pre className="text-[11px] font-mono text-sky-400 whitespace-pre">
                {JSON.stringify(elements, null, 2)}
            </pre>
            </div>
        </div>
        </div>
    );
}