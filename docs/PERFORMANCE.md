# Performance Optimization Notes

## Current Metrics

### Map Rendering
- 908 cities loaded efficiently via external JSON
- Fixed-size hexagon markers (14px) prevent zoom lag
- Leaflet CartoDB Dark theme for smooth tiles

### Areas for Improvement
- [ ] Implement marker clustering for dense regions
- [ ] Add virtual scrolling for city sidebar
- [ ] Lazy load city details on demand
- [ ] Cache wallet connection state

### Mobile Performance
- Tested on: iPhone 14, Samsung Galaxy S23
- Issues: Sidebar overflows on small screens
- Solution: Collapsible sidebar needed

## Bundle Size
- React 18 (development): ~300KB
- Leaflet: ~200KB
- Babel standalone: ~2MB (only for dev)
- Total load time: ~2s on 4G

## Recommendations
1. Switch to React production build for deployment
2. Code-split Babel for faster initial load
3. Optimize images and assets

Last updated: March 18, 2025
