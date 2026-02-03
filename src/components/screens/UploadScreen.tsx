import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Upload, Camera, ArrowRight, ArrowLeft, ImageIcon } from 'lucide-react';

const UploadScreen: React.FC = () => {
  const { setCurrentScreen, uploadedImage, setUploadedImage } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Mock uploaded image for demo
  const useDemoImage = () => {
    setUploadedImage('/placeholder.svg');
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <button 
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="text-sm text-muted-foreground">Step 1 of 3</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="max-w-md w-full space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Let's Analyze Your Skin
            </h1>
            <p className="text-muted-foreground">
              Upload a clear, well-lit photo of your face for the best analysis results.
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`
              relative rounded-3xl border-2 border-dashed p-8 text-center
              transition-all duration-300 cursor-pointer
              ${dragActive 
                ? 'border-primary bg-primary/5 scale-[1.02]' 
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
              ${uploadedImage ? 'border-solid border-primary bg-primary/5' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />

            {uploadedImage ? (
              <div className="space-y-4">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-card">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded skin" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-primary font-medium">
                  Photo uploaded! Click to change.
                </p>
              </div>
            ) : (
              <div className="space-y-4 py-8">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Drag & drop your photo here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Alternative options */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14" onClick={() => fileInputRef.current?.click()}>
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
            <Button variant="soft" className="h-14" onClick={useDemoImage}>
              <ImageIcon className="w-5 h-5 mr-2" />
              Use Demo
            </Button>
          </div>

          {/* Tips */}
          <div className="bg-card rounded-2xl p-5 shadow-card space-y-3">
            <h3 className="font-semibold text-foreground">Photo Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Use natural lighting, avoid harsh shadows
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Remove makeup for accurate analysis
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Face the camera directly
              </li>
            </ul>
          </div>

          {/* Continue Button */}
          <Button 
            variant="hero" 
            size="lg"
            className="w-full"
            disabled={!uploadedImage}
            onClick={() => setCurrentScreen('questionnaire')}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default UploadScreen;
