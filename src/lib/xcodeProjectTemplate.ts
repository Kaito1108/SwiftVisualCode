/**
 * Xcode Project Template Generator
 * This utility provides functions to generate Xcode project structure
 */

/**
 * Generates a basic Xcode project structure
 * @param projectName - Name of the project
 * @param swiftCode - Swift code to include in the project
 * @returns Project files as a ZIP archive
 */
export async function generateXcodeProject(projectName: string, swiftCode: string): Promise<Blob> {
    // Create project.pbxproj content
    const pbxproj = generatePBXProj(projectName);

    // Create Info.plist content
    const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleExecutable</key>
    <string>${projectName}</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.${projectName}</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>${projectName}</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.15</string>
</dict>
</plist>`;

    // Create scheme management content
    const schemeManagement = `<?xml version="1.0" encoding="UTF-8"?>
<Scheme LastUpgradeVersion="1250" version="1.3">
   <BuildAction parallelizeBuildables="YES" buildImplicitDependencies="YES">
      <BuildActionEntries>
         <BuildActionEntry buildForTesting="YES" buildForRunning="YES" buildForProfiling="YES" buildForArchiving="YES" buildForAnalyzing="YES">
            <BuildableReference BuildableIdentifier="primary" BlueprintIdentifier="${generateUUID()}" BuildableName="${projectName}.app" BlueprintName="${projectName}" ReferencedContainer="container:${projectName}.xcodeproj"></BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
</Scheme>`;

    // Create xcschememanagement.plist content
    const xcschememanagement = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>SchemeUserState</key>
	<dict>
		<key>${projectName}.xcscheme_^#shared#^_</key>
		<dict>
			<key>orderHint</key>
			<integer>0</integer>
		</dict>
	</dict>
</dict>
</plist>`;

    // Create basic project structure with proper directory hierarchy
    const files = {
        // Xcode project files
        [`${projectName}.xcodeproj/project.pbxproj`]: pbxproj,
        [`${projectName}.xcodeproj/xcshareddata/xcschemes/${projectName}.xcscheme`]: schemeManagement,
        [`${projectName}.xcodeproj/project.xcworkspace/contents.xcworkspacedata`]: `<?xml version="1.0" encoding="UTF-8"?>
<Workspace version="1.0">
    <FileRef location="self:${projectName}.xcodeproj"></FileRef>
</Workspace>`,
        [`${projectName}.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/configuration`]: ``,

        // xcuserdata files
        [`${projectName}.xcodeproj/xcuserdata/takahashikaito.xcuserdatad/xcschemes/xcschememanagement.plist`]: xcschememanagement,
        [`${projectName}.xcodeproj/project.xcworkspace/xcuserdata/takahashikaito.xcuserdatad/UserInterfaceState.xcuserstate`]: ``, // 空のファイルとして作成

        // Main app files
        [`${projectName}/${projectName}App.swift`]: `import SwiftUI

@main
struct ${projectName}App: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`,
        [`${projectName}/ContentView.swift`]: `import SwiftUI

${swiftCode}`,
        [`${projectName}/Info.plist`]: infoPlist,

        // Assets
        [`${projectName}/Assets.xcassets/Contents.json`]: `{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}`,
        [`${projectName}/Assets.xcassets/AccentColor.colorset/Contents.json`]: `{
  "colors" : [
    {
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}`,
        [`${projectName}/Assets.xcassets/AppIcon.appiconset/Contents.json`]: `{
  "images" : [
    {
      "idiom" : "universal",
      "platform" : "ios",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}`,

        // Preview Content
        [`${projectName}/Preview Content/Preview Assets.xcassets/Contents.json`]: `{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}`
    };

    // Create ZIP file
    return createZipArchive(projectName, files);
}

/**
 * Generates project.pbxproj file content
 * @param projectName - Name of the project
 * @returns project.pbxproj content
 */
function generatePBXProj(projectName: string): string {
    const projectUUID = generateUUID();
    const mainGroupUUID = generateUUID();
    const targetUUID = generateUUID();
    const buildConfigurationListUUID = generateUUID();
    const debugConfigurationUUID = generateUUID();
    const releaseConfigurationUUID = generateUUID();
    const productFileRefUUID = generateUUID();
    const sourcesGroupUUID = generateUUID();
    const frameworksGroupUUID = generateUUID();
    const resourcesGroupUUID = generateUUID();
    const productsGroupUUID = generateUUID();
    const targetBuildConfigListUUID = generateUUID();
    const targetDebugConfigUUID = generateUUID();
    const targetReleaseConfigUUID = generateUUID();
    const appFileUUID = generateUUID();
    const contentViewFileUUID = generateUUID();
    const appDelegateFileUUID = generateUUID();
    const assetCatalogFileUUID = generateUUID();
    const infoPlistFileUUID = generateUUID();
    const buildPhaseUUID = generateUUID();
    const resourcesBuildPhaseUUID = generateUUID();
    const frameworksBuildPhaseUUID = generateUUID();
    // 新しいUUID変数を追加
    const contentViewBuildFileUUID = generateUUID();
    const assetCatalogBuildFileUUID = generateUUID();

    return `// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 46;
	objects = {

/* Begin PBXBuildFile section */
		${appDelegateFileUUID} /* ${projectName}App.swift in Sources */ = {isa = PBXBuildFile; fileRef = ${appFileUUID} /* ${projectName}App.swift */; };
		${contentViewBuildFileUUID} /* ContentView.swift in Sources */ = {isa = PBXBuildFile; fileRef = ${contentViewFileUUID} /* ContentView.swift */; };
		${assetCatalogBuildFileUUID} /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = ${assetCatalogFileUUID} /* Assets.xcassets */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
		${productFileRefUUID} /* ${projectName}.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = "${projectName}.app"; sourceTree = BUILT_PRODUCTS_DIR; };
		${appFileUUID} /* ${projectName}App.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "${projectName}App.swift"; sourceTree = "<group>"; };
		${contentViewFileUUID} /* ContentView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "ContentView.swift"; sourceTree = "<group>"; };
		${assetCatalogFileUUID} /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = "Assets.xcassets"; sourceTree = "<group>"; };
		${infoPlistFileUUID} /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = "Info.plist"; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		${frameworksBuildPhaseUUID} /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		${mainGroupUUID} = {
			isa = PBXGroup;
			children = (
				${sourcesGroupUUID} /* ${projectName} */,
				${productsGroupUUID} /* Products */,
				${frameworksGroupUUID} /* Frameworks */,
			);
			sourceTree = "<group>";
		};
		${sourcesGroupUUID} /* ${projectName} */ = {
			isa = PBXGroup;
			children = (
				${appFileUUID} /* ${projectName}App.swift */,
				${contentViewFileUUID} /* ContentView.swift */,
				${assetCatalogFileUUID} /* Assets.xcassets */,
				${infoPlistFileUUID} /* Info.plist */,
			);
			path = "${projectName}";
			sourceTree = "<group>";
		};
		${productsGroupUUID} /* Products */ = {
			isa = PBXGroup;
			children = (
				${productFileRefUUID} /* ${projectName}.app */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		${frameworksGroupUUID} /* Frameworks */ = {
			isa = PBXGroup;
			children = (
			);
			name = Frameworks;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		${targetUUID} /* ${projectName} */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = ${targetBuildConfigListUUID} /* Build configuration list for PBXNativeTarget "${projectName}" */;
			buildPhases = (
				${buildPhaseUUID} /* Sources */,
				${frameworksBuildPhaseUUID} /* Frameworks */,
				${resourcesBuildPhaseUUID} /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = "${projectName}";
			productName = "${projectName}";
			productReference = ${productFileRefUUID} /* ${projectName}.app */;
			productType = "com.apple.product-type.application";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		${projectUUID} /* Project object */ = {
			isa = PBXProject;
			attributes = {
				LastUpgradeCheck = 1250;
				ORGANIZATIONNAME = "";
				TargetAttributes = {
					${targetUUID} = {
						CreatedOnToolsVersion = 12.5;
					};
				};
			};
			buildConfigurationList = ${buildConfigurationListUUID} /* Build configuration list for PBXProject "${projectName}" */;
			compatibilityVersion = "Xcode 9.3";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = ${mainGroupUUID};
			productRefGroup = ${productsGroupUUID} /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				${targetUUID} /* ${projectName} */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		${resourcesBuildPhaseUUID} /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				${assetCatalogBuildFileUUID} /* Assets.xcassets in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		${buildPhaseUUID} /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				${contentViewBuildFileUUID} /* ContentView.swift in Sources */,
				${appDelegateFileUUID} /* ${projectName}App.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		${debugConfigurationUUID} /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				MACOSX_DEPLOYMENT_TARGET = 10.15;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = macosx;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
			};
			name = Debug;
		};
		${releaseConfigurationUUID} /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				MACOSX_DEPLOYMENT_TARGET = 10.15;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = macosx;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
			};
			name = Release;
		};
		${targetDebugConfigUUID} /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_STYLE = Automatic;
				COMBINE_HIDPI_IMAGES = YES;
				ENABLE_PREVIEWS = YES;
				INFOPLIST_FILE = "${projectName}/Info.plist";
				LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/../Frameworks";
				PRODUCT_BUNDLE_IDENTIFIER = "com.example.${projectName}";
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
			};
			name = Debug;
		};
		${targetReleaseConfigUUID} /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_STYLE = Automatic;
				COMBINE_HIDPI_IMAGES = YES;
				ENABLE_PREVIEWS = YES;
				INFOPLIST_FILE = "${projectName}/Info.plist";
				LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/../Frameworks";
				PRODUCT_BUNDLE_IDENTIFIER = "com.example.${projectName}";
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		${buildConfigurationListUUID} /* Build configuration list for PBXProject "${projectName}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				${debugConfigurationUUID} /* Debug */,
				${releaseConfigurationUUID} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		${targetBuildConfigListUUID} /* Build configuration list for PBXNativeTarget "${projectName}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				${targetDebugConfigUUID} /* Debug */,
				${targetReleaseConfigUUID} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = ${projectUUID} /* Project object */;
}
`;
}

/**
 * Generates a UUID for Xcode project
 * @returns UUID string
 */
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Creates a ZIP archive with project files
 * @param projectName - Name of the project
 * @param files - Object containing file names and their contents
 * @returns Blob containing the ZIP archive
 */
import JSZip from 'jszip';

async function createZipArchive(projectName: string, files: { [key: string]: string }): Promise<Blob> {
    const zip = new JSZip();

    // Add files to zip with proper directory structure
    Object.entries(files).forEach(([path, content]) => {
        // Add files directly to ensure correct folder hierarchy
        // The path already includes the project structure
        zip.file(path, content);
    });

    // Generate zip file with compression
    return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}