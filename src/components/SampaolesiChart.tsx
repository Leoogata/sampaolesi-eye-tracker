import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SampaolesiChart = () => {
  const [points, setPoints] = useState([]);
  const [selectedX, setSelectedX] = useState('');
  const [selectedY, setSelectedY] = useState('');
  const [selectedEye, setSelectedEye] = useState('right');

  // Chart configuration
  const width = 700;
  const height = 450;
  const margin = { top: 30, right: 30, bottom: 60, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Scales
  const minX = 0, maxX = 80;
  const minY = 17, maxY = 30;

  const scaleX = (x) => ((x - minX) / (maxX - minX)) * chartWidth;
  const scaleY = (y) => chartHeight - ((y - minY) / (maxY - minY)) * chartHeight;

  // Sampaolesi equations
  const sampaolesiEquation = (x) => {
    if (x < 1) return null;
    return 18.7 + 2.245 * Math.log10(x);
  };

  const lowerBoundEquation = (x) => {
    if (x < 1) return null;
    return 17.379 + 2.245 * Math.log10(x);
  };

  const upperBoundEquation = (x) => {
    if (x < 1) return null;
    return 20.021 + 2.245 * Math.log10(x);
  };

  // Generate reference lines
  const generateReferenceLine = () => {
    const meanPoints = [];
    const upperPoints = [];
    const lowerPoints = [];
    
    for (let x = 1; x <= maxX; x += 0.5) {
      const meanY = sampaolesiEquation(x);
      const upperY = upperBoundEquation(x);
      const lowerY = lowerBoundEquation(x);
      
      if (meanY !== null && meanY >= minY && meanY <= maxY) {
        meanPoints.push({ x, y: meanY });
      }
      if (upperY !== null && upperY >= minY && upperY <= maxY) {
        upperPoints.push({ x, y: upperY });
      }
      if (lowerY !== null && lowerY >= minY && lowerY <= maxY) {
        lowerPoints.push({ x, y: lowerY });
      }
    }
    return { meanPoints, upperPoints, lowerPoints };
  };

  const { meanPoints, upperPoints, lowerPoints } = generateReferenceLine();

  const createReferencePath = (points) => {
    if (points.length === 0) return '';
    
    let path = `M ${scaleX(points[0].x)} ${scaleY(points[0].y)}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${scaleX(points[i].x)} ${scaleY(points[i].y)}`;
    }
    return path;
  };

  const createEyePath = (eyePoints) => {
    if (eyePoints.length < 2) return '';
    
    const sortedPoints = [...eyePoints].sort((a, b) => a.x - b.x);
    
    let path = `M ${scaleX(sortedPoints[0].x)} ${scaleY(sortedPoints[0].y)}`;
    for (let i = 1; i < sortedPoints.length; i++) {
      path += ` L ${scaleX(sortedPoints[i].x)} ${scaleY(sortedPoints[i].y)}`;
    }
    return path;
  };

  const rightEyePoints = points.filter(point => point.eye === 'right');
  const leftEyePoints = points.filter(point => point.eye === 'left');

  const addPoint = () => {
    const x = parseFloat(selectedX);
    const y = parseFloat(selectedY);
    
    if (!isNaN(x) && !isNaN(y) && x >= minX && x <= maxX && y >= minY && y <= maxY) {
      setPoints([...points, { x, y, eye: selectedEye, id: Date.now() }]);
      setSelectedX('');
      setSelectedY('');
    } else {
      alert(`Por favor, insira valores válidos: Idade (${minX}-${maxX}), Comprimento Axial (${minY}-${maxY})`);
    }
  };

  const clearPoints = () => {
    setPoints([]);
  };

  const removePoint = (id) => {
    setPoints(points.filter(point => point.id !== id));
  };

  // Grid lines and labels
  const gridLines = [];
  const xLabels = [];
  const yLabels = [];

  for (let i = minX; i <= maxX; i += 5) {
    gridLines.push(
      <line
        key={`v-${i}`}
        x1={scaleX(i)}
        y1={0}
        x2={scaleX(i)}
        y2={chartHeight}
        stroke="currentColor"
        strokeWidth="1"
        className="text-chart-grid"
      />
    );
    xLabels.push(
      <text
        key={`x-${i}`}
        x={scaleX(i)}
        y={chartHeight + 25}
        textAnchor="middle"
        fontSize="12"
        className="fill-chart-text"
      >
        {i}
      </text>
    );
  }

  for (let i = minY; i <= maxY; i += 1) {
    gridLines.push(
      <line
        key={`h-${i}`}
        x1={0}
        y1={scaleY(i)}
        x2={chartWidth}
        y2={scaleY(i)}
        stroke="currentColor"
        strokeWidth="1"
        className="text-chart-grid"
      />
    );
    yLabels.push(
      <text
        key={`y-${i}`}
        x={-15}
        y={scaleY(i) + 4}
        textAnchor="middle"
        fontSize="12"
        className="fill-chart-text"
      >
        {i}
      </text>
    );
  }

  return (
    <div className="space-y-8">
      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-chart-right-eye rounded-full"></div>
              <span>Olho Direito</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-chart-left-eye rounded-full"></div>
              <span>Olho Esquerdo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Adicionar Ponto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Idade (meses)
              </label>
              <Input
                type="number"
                min="0"
                max="80"
                step="1"
                value={selectedX}
                onChange={(e) => setSelectedX(e.target.value)}
                placeholder="Ex: 36"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Comprimento Axial (mm)
              </label>
              <Input
                type="number"
                min="17"
                max="30"
                step="0.1"
                value={selectedY}
                onChange={(e) => setSelectedY(e.target.value)}
                placeholder="Ex: 23.5"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Olho
              </label>
              <Select value={selectedEye} onValueChange={setSelectedEye}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="right">Direito</SelectItem>
                  <SelectItem value="left">Esquerdo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={addPoint} className="bg-medical-green hover:bg-medical-green-hover text-primary-foreground">
                Inserir ponto
              </Button>
              <Button onClick={clearPoints} variant="destructive" size="sm">
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <svg width={width} height={height} className="border border-chart-border bg-chart-bg rounded-lg">
              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {/* Grid */}
                {gridLines}
                
                {/* Reference lines */}
                {meanPoints.length > 0 && (
                  <g>
                    {/* Shaded area between bounds */}
                    {upperPoints.length > 0 && lowerPoints.length > 0 && (
                      <path
                        d={`${createReferencePath(lowerPoints)} L ${scaleX(upperPoints[upperPoints.length - 1].x)} ${scaleY(upperPoints[upperPoints.length - 1].y)} ${createReferencePath([...upperPoints].reverse()).replace('M', 'L')} Z`}
                        fill="currentColor"
                        className="text-orange-500/20"
                      />
                    )}
                    
                    {/* Upper bound */}
                    <path
                      d={createReferencePath(upperPoints)}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="text-chart-bounds"
                    />
                    
                    {/* Lower bound */}
                    <path
                      d={createReferencePath(lowerPoints)}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="text-chart-bounds"
                    />
                    
                    {/* Mean line */}
                    <path
                      d={createReferencePath(meanPoints)}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-chart-reference"
                    />
                  </g>
                )}

                {/* Eye connection lines */}
                {rightEyePoints.length > 1 && (
                  <path
                    d={createEyePath(rightEyePoints)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-chart-right-eye opacity-70"
                  />
                )}

                {leftEyePoints.length > 1 && (
                  <path
                    d={createEyePath(leftEyePoints)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-chart-left-eye opacity-70"
                  />
                )}
                
                {/* Axes */}
                <line x1={0} y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="currentColor" strokeWidth="2" className="text-chart-text" />
                <line x1={0} y1={0} x2={0} y2={chartHeight} stroke="currentColor" strokeWidth="2" className="text-chart-text" />
                
                {/* Labels */}
                {xLabels}
                {yLabels}
                
                {/* Axis titles */}
                <text x={chartWidth/2} y={chartHeight + 50} textAnchor="middle" fontSize="14" className="fill-chart-text font-medium">
                  Idade (meses)
                </text>
                <text 
                  x={-35} 
                  y={chartHeight/2} 
                  textAnchor="middle" 
                  fontSize="14" 
                  className="fill-chart-text font-medium"
                  transform={`rotate(-90, -35, ${chartHeight/2})`}
                >
                  Comprimento Axial (mm)
                </text>
                
                {/* Data points */}
                {points.map((point) => (
                  <g key={point.id}>
                    <circle
                      cx={scaleX(point.x)}
                      cy={scaleY(point.y)}
                      r="6"
                      fill="currentColor"
                      stroke="white"
                      strokeWidth="2"
                      className={`cursor-pointer hover:scale-110 transition-transform ${
                        point.eye === 'right' ? 'text-chart-right-eye' : 'text-chart-left-eye'
                      }`}
                      onClick={() => removePoint(point.id)}
                    />
                    <text
                      x={scaleX(point.x)}
                      y={scaleY(point.y) - 12}
                      textAnchor="middle"
                      fontSize="10"
                      className="fill-chart-text pointer-events-none font-medium"
                    >
                      ({point.x}, {point.y.toFixed(1)})
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Points List */}
      {points.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Pontos Plotados ({points.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rightEyePoints.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-chart-right-eye mb-3">
                  Olho Direito ({rightEyePoints.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rightEyePoints.map((point) => {
                    const referenceValue = sampaolesiEquation(point.x);
                    const difference = referenceValue ? (point.y - referenceValue) : null;
                    const isAbove = difference && difference > 0;
                    
                    return (
                      <span
                        key={point.id}
                        className="inline-flex items-center px-3 py-2 bg-blue-50 text-chart-right-eye rounded-full text-sm cursor-pointer hover:bg-blue-100 transition-colors border border-chart-right-eye/20"
                        onClick={() => removePoint(point.id)}
                        title={`Clique para remover. Diferença da referência: ${isAbove ? '+' : ''}${difference?.toFixed(2) || 'N/A'} mm`}
                      >
                        ({point.x}, {point.y})
                        <span className={`ml-2 text-xs ${isAbove ? 'text-red-600' : 'text-green-600'}`}>
                          {isAbove ? '▲' : '▼'}{difference ? Math.abs(difference).toFixed(2) : 'N/A'}
                        </span>
                        <span className="ml-2 text-xs opacity-60">✕</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {leftEyePoints.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-medium text-chart-left-eye mb-3">
                  Olho Esquerdo ({leftEyePoints.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {leftEyePoints.map((point) => {
                    const referenceValue = sampaolesiEquation(point.x);
                    const difference = referenceValue ? (point.y - referenceValue) : null;
                    const isAbove = difference && difference > 0;
                    
                    return (
                      <span
                        key={point.id}
                        className="inline-flex items-center px-3 py-2 bg-orange-50 text-chart-left-eye rounded-full text-sm cursor-pointer hover:bg-orange-100 transition-colors border border-chart-left-eye/20"
                        onClick={() => removePoint(point.id)}
                        title={`Clique para remover. Diferência da referência: ${isAbove ? '+' : ''}${difference?.toFixed(2) || 'N/A'} mm`}
                      >
                        ({point.x}, {point.y})
                        <span className={`ml-2 text-xs ${isAbove ? 'text-red-600' : 'text-green-600'}`}>
                          {isAbove ? '▲' : '▼'}{difference ? Math.abs(difference).toFixed(2) : 'N/A'}
                        </span>
                        <span className="ml-2 text-xs opacity-60">✕</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              Clique nos pontos do gráfico ou nas etiquetas acima para removê-los
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SampaolesiChart;