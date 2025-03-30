import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/javascript";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { javascriptGenerator } from "blockly/javascript";
import { convertJsToSwift } from "./lib/jsToSwift";
import { generateXcodeProject } from "./lib/xcodeProjectTemplate";
// 日本語ロケールのインポート
import * as Ja from "blockly/msg/ja";

export default function App() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);
  const [swiftCode, setSwiftCode] = useState<string>("");
  const [fileName, setFileName] = useState<string>("MyXcodeProject");
  
  // Blocklyのテーマを定義
  const blocklyTheme = {
    name: 'customTheme',
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: '#f5f5f5',
      toolboxBackgroundColour: '#4a6cd4',
      toolboxForegroundColour: '#fff',
      flyoutBackgroundColour: '#5c7de0',
      flyoutForegroundColour: '#fff',
    },
    blockStyles: {
      logic_blocks: {
        colourPrimary: '#4a6cd4',
        colourSecondary: '#8aa5e3',
        colourTertiary: '#7a96d6',
        hat: '',
        borderRadius: 10
      },
      loop_blocks: {
        colourPrimary: '#4a8cd4',
        colourSecondary: '#8aafe3',
        colourTertiary: '#7aa6d6',
        hat: '',
        borderRadius: 10
      },
      math_blocks: {
        colourPrimary: '#5b67a5',
        colourSecondary: '#8f95c2',
        colourTertiary: '#7b84b7',
        hat: '',
        borderRadius: 10
      },
      text_blocks: {
        colourPrimary: '#5ba58c',
        colourSecondary: '#8fc2b2',
        colourTertiary: '#7cb7a2',
        hat: '',
        borderRadius: 10
      },
      variable_blocks: {
        colourPrimary: '#a55b5b',
        colourSecondary: '#c28f8f',
        colourTertiary: '#b77c7c',
        hat: '',
        borderRadius: 10
      },
      procedure_blocks: {
        colourPrimary: '#995ba5',
        colourSecondary: '#c28fc2',
        colourTertiary: '#b77cb7',
        hat: '',
        borderRadius: 10
      }
    },
    fontStyle: {
      family: 'sans-serif',
      weight: 'bold',
      size: 12
    },
  };

  useEffect(() => {
    console.log("UseEffect");
    // 日本語ロケールを設定
    Blockly.setLocale(Ja);
    
    // テーマを事前に定義
    const theme = new Blockly.Theme('customTheme', blocklyTheme.blockStyles, blocklyTheme.componentStyles, blocklyTheme.fontStyle);
    Blockly.Themes['customTheme'] = theme;
    
    if (blocklyDiv.current) {
      // カテゴリ分けされたツールボックスの定義
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          <category name="論理" colour="#4a6cd4">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="ループ" colour="#4a8cd4">
            <block type="controls_repeat_ext"></block>
            <block type="controls_whileUntil"></block>
            <block type="controls_for"></block>
          </category>
          <category name="数学" colour="#5b67a5">
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="テキスト" colour="#5ba58c">
            <block type="text"></block>
            <block type="text_join"></block>
            <block type="text_print"></block>
          </category>
          <category name="変数" custom="VARIABLE" colour="#a55b5b"></category>
          <category name="関数" custom="PROCEDURE" colour="#995ba5"></category>
        </xml>
      `;
      
      // Blocklyワークスペースの初期化
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolboxXml,
        theme: Blockly.Themes['customTheme'],
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
        trashcan: true,
        scrollbars: true,
        sounds: false,
        media: 'https://blockly-demo.appspot.com/static/media/',
      });
      
      // ブロックスタイルのカスタマイズはテーマで設定済み
    }
  }, []);

  const generateSwiftCode = (): void => {
    if (workspace.current) {
      const jsCode = javascriptGenerator.workspaceToCode(workspace.current);
      console.log("Generated JavaScript Code:", jsCode);
      
      // Convert JavaScript code to Swift code
      const swiftCode = convertJsToSwift(jsCode);
      console.log("Generated Swift Code:", swiftCode);
      
      setSwiftCode(swiftCode);
    }
  };

  const exportSwiftFile = async () => {
    if (!swiftCode) return;
    
    const blob = await generateXcodeProject(fileName, swiftCode);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Swift Visual Code</h1>
        <p className="text-gray-600">ブロックでSwiftコードを作成</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">ブロックエディタ</h2>
            <div ref={blocklyDiv} className="h-[500px] border rounded-md bg-white overflow-hidden [&:has(.injectionDiv)]:overflow-auto [&:not(:has(.injectionDiv))]:overflow-hidden"></div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">Swiftコード</h2>
            <Card className="border border-gray-200">
              <CardContent>
                <pre className="whitespace-pre-wrap p-3 bg-gray-50 rounded-md text-sm font-mono h-[300px] overflow-auto">
                  {swiftCode || "Swiftコードがここに表示されます..."}
                </pre>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">エクスポート</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">プロジェクト名</label>
                <input
                  id="fileName"
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="プロジェクト名を入力"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={generateSwiftCode} 
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  コード生成
                </Button>
                <Button
                  onClick={exportSwiftFile}
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                  disabled={!swiftCode}
                >
                  Xcodeプロジェクト出力
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}