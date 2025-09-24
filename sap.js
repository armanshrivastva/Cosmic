// =======================
// OpenSeadragon Ultra Zoom with Label List
// =======================

// Initialize OpenSeadragon viewer
const viewer = OpenSeadragon({
    id: "viewer",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: {
        type: 'image',
        url: '6903870~large.jpg', // Replace with your image path
        buildPyramid: false
    },
    showNavigator: false,         // Hide navigator
    showNavigationControl: false, // Hide default controls
    minZoomLevel: 0.1,            // Minimum zoom
    maxZoomPixelRatio: 20,        // Ultra zoom (up to 2000% of original pixels)
    defaultZoomLevel: 1,
    visibilityRatio: 1,
    gestureSettingsMouse: {
        scrollToZoom: true,
        clickToZoom: false
    },
    gestureSettingsTouch: {
        pinchToZoom: true,
        flickEnabled: true
    }
});

// Container for labels
const labelsContainer = document.getElementById('labels-container');
let addingLabel = false;

// Toggle Add Label mode
document.getElementById('add-label').addEventListener('click', () => {
    addingLabel = !addingLabel;
    document.getElementById('add-label').style.background = addingLabel ? '#FFD700' : 'rgba(255,255,255,0.8)';
});

// Zoom controls
document.getElementById('zoom-in').addEventListener('click', () => {
    viewer.viewport.zoomBy(1.2);
    viewer.viewport.applyConstraints();
});
document.getElementById('zoom-out').addEventListener('click', () => {
    viewer.viewport.zoomBy(0.8);
    viewer.viewport.applyConstraints();
});

// Label list container
const labelList = document.getElementById('label-list');

function addLabelToList(labelDiv, labelText) {
    const li = document.createElement('li');
    li.textContent = labelText;

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        if (labelsContainer.contains(labelDiv)) labelsContainer.removeChild(labelDiv);
        if (labelList.contains(li)) labelList.removeChild(li);
    });

    li.appendChild(delBtn);
    labelList.appendChild(li);
}

// Add label on image click
viewer.addHandler('canvas-click', function(event) {
    if (!addingLabel) return;

    const webPoint = event.position;
    const viewportPoint = viewer.viewport.pointFromPixel(webPoint);
    const imagePoint = viewer.viewport.viewportToImageCoordinates(viewportPoint);

    // Create label
    const label = document.createElement('div');
    label.className = 'label';
    const text = prompt("Enter label:", "New Label") || "Label";
    const labelText = document.createElement('div');
    labelText.className = 'label-text';
    labelText.textContent = text;
    label.appendChild(labelText);
    labelsContainer.appendChild(label);

    // Update label position function
    function updateLabel() {
        const pixel = viewer.viewport.imageToViewportCoordinates(imagePoint);
        const coords = viewer.viewport.viewportToViewerElementCoordinates(pixel);
        label.style.left = coords.x + 'px';
        label.style.top = coords.y + 'px';
    }

    viewer.addHandler('animation', updateLabel);
    viewer.addHandler('resize', updateLabel);
    updateLabel();

    // Add to left-side list
    addLabelToList(label, text);
});

