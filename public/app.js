// Nodus / Walrus Photos Advanced Client Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ==========================================
  // INTERNATIONALIZATION (i18n) DICTIONARY
  // ==========================================
  const translations = {
    en: {
      brand_tag: "WALRUS PROTOCOL",
      status_connecting: "Connecting to Walrus...",
      status_connected: "Walrus Connected • {name} Bucket",
      status_offline: "Offline / Reconnecting",
      search_placeholder: "Search memories, tags, or file names...",
      quota_label: "Walrus Storage",
      upload_btn: "Upload Photos",
      banner_seal: "Client Encrypted",
      banner_walrus: "Walrus Storage",
      banner_sui: "Zero-Knowledge Verified",
      drop_title: "Drop your photos & videos here",
      drop_subtitle: "Encrypted on your device before touching Walrus. Full-resolution, uncompressed preservation.",
      browse_btn: "Browse Files",
      progress_title: "Encrypting & Uploading to Walrus...",
      step1_text: "1. Seal Envelope Encryption",
      step2_text: "2. Walrus Blob Registration",
      step3_text: "3. Anchored in Bucket",
      timeline_title: "Timeline & Memories",
      loading_vault: "Syncing memories...",
      photo_counter: "{count} {word} securely preserved",
      word_single: "memory",
      word_plural: "memories",
      empty_title: "Your Sovereign Vault is Empty",
      empty_desc: "No photos or media stored yet in your Walrus bucket. Drag and drop any picture above to start building your decentralized Google Photos alternative.",
      meta_blob_id: "Walrus Blob ID",
      meta_file_id: "Console File ID",
      meta_seal_policy: "Seal Encryption Policy",
      meta_file_size: "File Size",
      meta_upload_date: "Captured / Uploaded",
      download_btn: "Download Original",
      delete_btn: "Delete from Walrus",
      delete_confirm: "Are you sure you want to permanently delete \"{name}\" from Walrus?",
      deleting: "Deleting...",
      sync_failed: "Sync failed",
      conn_error: "Connection error",
      anchored_walrus: "Anchored in Walrus",
      active_vault: "Active Vault",
      select_btn: "Select",
      cancel_select: "Done",
      deselect_all: "Deselect",
      download_selected: "Download",
      delete_selected: "Delete Selected",
      batch_confirm: "Are you sure you want to permanently delete {count} selected photos from Walrus?",
      batch_deleting: "Deleting {count} photos...",
      edit_photo_title: "Edit Memory Details",
      edit_filename: "File Name",
      edit_description: "Description / Caption",
      edit_tags: "Tags (comma separated)",
      cancel: "Cancel",
      save_changes: "Save Changes",
      saving: "Saving...",
      vault_manager_title: "Sui Vault & Identity Manager",
      vault_manager_subtitle: "Switch between verified Master Custodian and Ephemeral Beta Tester Vaults.",
      generate_new_vault: "Generate Ephemeral Test Vault",
      generate_hint: "Creates a cryptographic Ed25519 keypair and derived Sui address instantly for isolated beta testing.",
      toast_uploaded: "Photo encrypted and anchored in Walrus!",
      toast_deleted: "Photo deleted from Walrus",
      toast_updated: "Metadata updated successfully",
      toast_vault_switched: "Switched to vault: {addr}",
      toast_wallet_generated: "New ephemeral test vault generated!",
      toast_copied: "Copied to clipboard!",
      upload_dock_title: "Encrypting & Uploading to Walrus...",
      upload_dock_complete: "All Photos Anchored in Walrus!",
      upload_dock_count: "{current} of {total} processed",
      step1_short: "1. Seal Encryption",
      step2_short: "2. Walrus Blob Store",
      step3_short: "3. Anchored in Bucket",
      optimistic_encrypting: "Seal Encrypting...",
      optimistic_uploading: "Storing on Walrus...",
      optimistic_anchored: "Anchored!",
      optimistic_failed: "Upload Failed",
      signin_zklogin: "Sign In",
      btn_google_zklogin: "Continue with Google",
      auth_title: "Sign in to Nodus",
      auth_subtitle: "Your photos are encrypted on your device before storing. Sign in effortlessly with Google—no seed phrase required.",
      or_continue_with: "or choose another method",
      auth_privacy_notice: "Google only verifies your identity; it never has access to your photos, encryption keys, or Walrus storage.",
      account_manager_title: "Sovereign Account & Vault",
      account_manager_subtitle: "Decentralized memory vault secured by Sui zkLogin and Walrus Protocol.",
      switch_account: "Switch Account / Sign In with Another ID",
      sign_out: "Sign Out",
      toast_signed_in: "Welcome to Nodus! Signed in with Google",
      toast_signed_out: "Signed out of sovereign session",
      toast_wallet_connected: "Connected Sui Wallet: {addr}",
      demo_btn: "1-Click Demo",
      privacy_status: "Encrypted & Anchored on Walrus",
      onchain_verification: "On-Chain Verification",
      tech_details: "Technical Details",
      share_memory_btn: "Share Memory",
      share_modal_title: "Share Sovereign Memory",
      share_modal_subtitle: "Share access with friends or wrap an encrypted key envelope.",
      share_link_label: "Direct Decrypted Share Link",
      share_link_help: "Anyone with this link can view the high-resolution media.",
      share_wrap_label: "Wrap for Teammate (Solana Address)",
      share_recipient_placeholder: "Enter recipient Solana address...",
      share_wrap_btn: "Protect with Recipient Key Envelope",
      close: "Close",
      auth_badge_label: "Zero-Knowledge Protected",
      auth_wallet_desc: "Browser extension",
      auth_guest_desc: "100% on-device",
      chip_e2e: "🔒 End-to-End Encrypted",
      chip_vault: "🌊 Walrus Sovereign Vault",
      advanced_blockchain_details: "Advanced Blockchain Details",
      modal_derived_address: "Derived Sui Address",
      modal_sig_scheme: "Signature Scheme",
      export_keypair: "Export Keypair Backup (JSON)",
      dock_proof_anchored: "Anchored on Sui & Walrus",
      toast_conn_restored: "Internet connection restored. Synchronizing catalog...",
      toast_conn_lost: "Internet connection lost. Switched to offline view.",
      toast_session_expired: "Session expired. Please sign in again.",
      toast_share_copied: "Decrypted share link copied to clipboard!",
      toast_recipient_wrapped: "Recipient envelope wrapped and ready to share!",
      toast_invalid_solana_addr: "Enter a valid Solana address (Base58, 32-44 characters)",
      theme_label: "Theme",
      theme_dark: "Dark",
      theme_light: "Light",
      theme_midnight: "Midnight",
      sort_newest: "Newest First",
      sort_oldest: "Oldest First",
      sort_name: "Name (A-Z)",
      sort_size: "Size (Largest)",
      tag_all: "All",
      tag_photos: "Photos",
      tag_nodus: "Nodus",
      launch_app: "Launch App",
      launch_app_sovereign: "Launch Sovereign App",
      back_to_website: "Website",
      hero_badge: "PROTOCOL SPECIFICATION — PRODUCTION READY",
      hero_title: "The Sovereign Cloud for What Cannot Be Seen.",
      hero_desc: "End-to-end encrypted storage on Walrus protocol. Identity verified on Sui via zero-knowledge proofs. Role-based access control anchored on Solana.",
      view_arch: "Architecture",
      nav_architecture: "Architecture",
      nav_demo: "Interactive Demo",
      nav_storage: "Storage",
      nav_how_it_works: "How It Works",
      nav_verification: "Verification",
      nav_developers: "Developers",
      demo_badge: "INTERACTIVE PLAYGROUND — NO ACCOUNT REQUIRED",
      demo_title: "Experience Sovereign Encryption in Real Time",
      demo_desc: "Select a sample memory or drop any photo below. Watch it get sealed with AES-256-GCM, dispersed into Walrus 2D Reed-Solomon slivers, and decrypted in browser memory.",
      arch_label: "INFRASTRUCTURE PRIMITIVES",
      arch_title: "Built On Uncompromising Decentralization",
      arch_desc: "Four independent cryptographic and distributed networks work in harmony to replace legacy centralized cloud monopolies.",
      arch_walrus_title: "Walrus Protocol",
      arch_walrus_desc: "Fountain erasure-coded decentralized blob storage. 2D Reed-Solomon encoding provides resilient 4.5x–5x replication efficiency without centralized choke points.",
      arch_sui_title: "Sui Network",
      arch_sui_desc: "Sub-second transaction finality, native object capabilities, and zero-knowledge zkLogin authentication. Gas-free onboarding directly from Web2 identities.",
      arch_solana_title: "Solana Devnet",
      arch_solana_desc: "High-throughput Anchor RBAC programs, PDA-derived organizational tenancy, and programmatic member capabilities enforcing corporate boundaries.",
      arch_seal_title: "Seal Client Encryption",
      arch_seal_desc: "Zero-knowledge threshold envelope encryption executed 100% in-browser before any byte touches network transit. Your keys never leave your custody.",
      verbs_label: "CORE CAPABILITIES",
      verbs_title: "What Nodus Enables",
      verbs_desc: "Sovereign primitives built into every layer without trusting a single central server.",
      verb_store_title: "Client-Side Sealed",
      verb_store_desc: "All media is encrypted with AES-256-GCM and Seal threshold keys in the user's browser before transmission. Walrus storage nodes only see unreadable ciphertext slivers.",
      verb_prove_title: "Zero-Knowledge Identity",
      verb_prove_desc: "Log in with Google zkLogin, Sui standard wallets, or 12-word BIP-39 mnemonic seed. Your Web2 email is cryptographically translated to a Sui address without leaking credentials.",
      verb_govern_title: "Multi-Chain RBAC",
      verb_govern_desc: "Anchor Program-Derived Addresses (PDAs) on Solana and Sui Objects enforce organizational member roles, viewer limits, and revocable team access policies.",
      verb_verify_title: "Verifiable Attestation",
      verb_verify_desc: "Audit blob roots on Walruscan, verify Sui policy state on SuiVision, and confirm Anchor RBAC on Solana Devnet Explorer with 1-click inspection.",
      steps_label: "EXECUTION LIFECYCLE",
      steps_title: "How It Works End-to-End",
      steps_desc: "From unencrypted file on your local disk to immutable multi-chain permanence.",
      step_1_title: "Envelope Encryption",
      step_1_desc: "Local browser derives a unique AES-256-GCM symmetric key and wraps it with Seal threshold encryption before transmission.",
      step_2_title: "2D Red Stuff Dispersal",
      step_2_desc: "Ciphertext is split into primary and secondary slivers via 2D Reed-Solomon erasure coding and distributed across Walrus storage nodes.",
      step_3_title: "Multi-Chain Attestation",
      step_3_desc: "Sui records blob certificates and ownership policies; Solana Anchor PDAs enforce organizational role-based access control.",
      step_4_title: "Zero-Knowledge Retrieval",
      step_4_desc: "Authorized callers reconstruct slivers from Walrus, verify cryptographic signatures, and decrypt 100% locally in browser memory.",
      roi_label: "SOVEREIGN ECONOMICS",
      roi_title: "Enterprise Cloud vs. Sovereign Cloud",
      roi_desc: "Stop paying extortionate egress fees and granting tech monopolies surveillance rights over your organization's intellectual property.",
      roi_egress_label: "Egress Fees",
      roi_egress_desc: "Decentralized blob retrieval with zero bandwidth tax or egress extortion.",
      roi_client_label: "Client-Side Sealed",
      roi_client_desc: "Zero cleartext data stored on servers or visible to storage node operators.",
      roi_eff_label: "Fountain Efficiency",
      roi_eff_desc: "Walrus 2D Red Stuff erasure coding delivers mathematical resilience with minimal overhead.",
      roi_finality_label: "Sui Network Finality",
      roi_finality_desc: "Sub-second transaction settlement and instant cryptographic authorization.",
      verify_label: "AUDITABLE CERTAINTY",
      verify_title: "Verify Cryptographic Integrity On-Chain",
      verify_desc: "Every stored memory and document produces mathematical proof anchored across decentralized ledgers. Inspect any blob root or policy state in real time.",
      open_verification: "Open Verification Console",
      dev_label: "DEVELOPER QUICKSTART",
      dev_title: "Integrate Sovereign Cloud in Minutes",
      dev_desc: "Build on the Nodus SDK or run your own local sovereign console with complete cryptographic isolation.",
      cta_title: "Ready to Own Your Sovereign Data?",
      cta_desc: "Zero subscriptions. Zero corporate tracking. Complete mathematical custody over what cannot be seen.",
      nav_api_keys: "API Keys",
      nav_team: "Team",
      dev_portal_title: "Developer & API Keys",
      dev_portal_subtitle: "Manage B2B API keys, view live storage usage, and inspect monthly cost metrics.",
      team_rbac_title: "Team Members & Access Control",
      team_rbac_subtitle: "Manage organization roles and cryptographic key envelope distributions."
    },
    es: {
      brand_tag: "PROTOCOLO WALRUS",
      status_connecting: "Conectando a Walrus...",
      status_connected: "Walrus Conectado • Bucket {name}",
      status_offline: "Desconectado / Reconectando",
      search_placeholder: "Buscar recuerdos, etiquetas o nombres...",
      quota_label: "Almacenamiento Walrus",
      upload_btn: "Subir Fotos",
      nav_api_keys: "API Keys",
      nav_team: "Equipo",
      dev_portal_title: "Desarrollador y API Keys",
      dev_portal_subtitle: "Administre claves API B2B, vea el uso de almacenamiento y métricas de costos.",
      team_rbac_title: "Miembros del Equipo y Control de Acceso",
      team_rbac_subtitle: "Administre roles y distribución de sobres criptográficos de claves.",
      banner_seal: "Cifrado en Cliente",
      banner_walrus: "Almacenamiento Walrus",
      banner_sui: "Verificado Zero-Knowledge",
      drop_title: "Arrastra tus fotos y videos aquí",
      drop_subtitle: "Encriptados en tu dispositivo antes de tocar Walrus. Preservación en resolución original sin compresión.",
      browse_btn: "Explorar Archivos",
      progress_title: "Encriptando y Subiendo a Walrus...",
      step1_text: "1. Encriptación de Sobre con Seal",
      step2_text: "2. Registro de Blob en Walrus",
      step3_text: "3. Asegurado en el Bucket",
      timeline_title: "Línea de Tiempo y Recuerdos",
      loading_vault: "Sincronizando recuerdos...",
      photo_counter: "{count} {word} preservados con seguridad",
      word_single: "recuerdo",
      word_plural: "recuerdos",
      empty_title: "Tu Bóveda Soberana está Vacía",
      empty_desc: "Aún no hay fotos ni medios guardados en tu bucket de Walrus. Arrastra y suelta cualquier imagen arriba para comenzar a construir tu alternativa descentralizada a Google Photos.",
      meta_blob_id: "ID de Blob en Walrus",
      meta_file_id: "ID de Archivo en Consola",
      meta_seal_policy: "Política de Encriptación Seal",
      meta_file_size: "Tamaño de Archivo",
      meta_upload_date: "Capturado / Subido",
      download_btn: "Descargar Original",
      delete_btn: "Eliminar de Walrus",
      delete_confirm: "¿Estás seguro de que deseas eliminar permanentemente \"{name}\" de Walrus?",
      deleting: "Eliminando...",
      sync_failed: "Error al sincronizar",
      conn_error: "Error de conexión",
      anchored_walrus: "Asegurado en Walrus",
      active_vault: "Bóveda Activa",
      select_btn: "Seleccionar",
      cancel_select: "Listo",
      deselect_all: "Deseleccionar",
      download_selected: "Descargar",
      delete_selected: "Eliminar Seleccionados",
      batch_confirm: "¿Estás seguro de que deseas eliminar permanentemente {count} fotos seleccionadas de Walrus?",
      batch_deleting: "Eliminando {count} fotos...",
      edit_photo_title: "Editar Detalles del Recuerdo",
      edit_filename: "Nombre de Archivo",
      edit_description: "Descripción",
      edit_tags: "Etiquetas (separadas por comas)",
      cancel: "Cancelar",
      save_changes: "Guardar Cambios",
      saving: "Guardando...",
      vault_manager_title: "Gestor de Bóvedas e Identidades Sui",
      vault_manager_subtitle: "Cambia entre la Bóveda Maestra Custodia y Bóvedas Efímeras de Prueba.",
      generate_new_vault: "Generar Bóveda Efímera de Prueba",
      generate_hint: "Crea un par de claves criptográficas Ed25519 y dirección Sui al instante para pruebas aisladas.",
      toast_uploaded: "¡Foto encriptada y asegurada en Walrus!",
      toast_deleted: "Foto eliminada de Walrus",
      toast_updated: "Metadatos actualizados con éxito",
      toast_vault_switched: "Cambiado a bóveda: {addr}",
      toast_wallet_generated: "¡Nueva bóveda efímera generada con éxito!",
      toast_copied: "¡Copiado al portapapeles!",
      upload_dock_title: "Encriptando y Subiendo a Walrus...",
      upload_dock_complete: "¡Todas las fotos aseguradas en Walrus!",
      upload_dock_count: "{current} de {total} procesados",
      step1_short: "1. Encriptación Seal",
      step2_short: "2. Guardado en Walrus",
      step3_short: "3. Asegurado en Bucket",
      optimistic_encrypting: "Encriptando con Seal...",
      optimistic_uploading: "Guardando en Walrus...",
      optimistic_anchored: "¡Asegurado!",
      optimistic_failed: "Error al subir",
      signin_zklogin: "Iniciar Sesión",
      btn_google_zklogin: "Continuar con Google",
      auth_title: "Iniciar Sesión en Nodus",
      auth_subtitle: "Tus fotos se cifran en tu dispositivo antes de guardarse. Inicia sesión fácilmente con Google, sin frases de recuperación.",
      or_continue_with: "o elige otro método",
      auth_privacy_notice: "Google solo verifica tu identidad; nunca tiene acceso a tus fotos, claves de encriptación ni almacenamiento en Walrus.",
      account_manager_title: "Cuenta Soberana y Bóveda",
      account_manager_subtitle: "Bóveda de recuerdos descentralizada protegida por Sui zkLogin y Protocolo Walrus.",
      switch_account: "Cambiar Cuenta / Iniciar con Otro ID",
      sign_out: "Cerrar Sesión",
      toast_signed_in: "¡Bienvenido a Nodus! Sesión iniciada con Google",
      toast_signed_out: "Sesión cerrada correctamente",
      toast_wallet_connected: "Billetera Sui conectada: {addr}",
      demo_btn: "Demo 1-Clic",
      privacy_status: "Encriptado y Asegurado en Walrus",
      onchain_verification: "Verificación On-Chain",
      tech_details: "Detalles Técnicos",
      share_memory_btn: "Compartir Recuerdo",
      share_modal_title: "Compartir Recuerdo Soberano",
      share_modal_subtitle: "Comparte acceso con amigos o envuelve un sobre de clave encriptado.",
      share_link_label: "Enlace Directo Desencriptado",
      share_link_help: "Cualquiera con este enlace puede ver el medio en alta resolución.",
      share_wrap_label: "Envolver para Compañero (Dirección Solana)",
      share_recipient_placeholder: "Ingresa dirección Solana del destinatario...",
      share_wrap_btn: "Proteger con Sobre de Clave del Destinatario",
      close: "Cerrar",
      auth_badge_label: "Protegido con Zero-Knowledge",
      auth_wallet_desc: "Extensión de navegador",
      auth_guest_desc: "100% en tu dispositivo",
      chip_e2e: "🔒 Encriptado Punto a Punto",
      chip_vault: "🌊 Bóveda Soberana Walrus",
      advanced_blockchain_details: "Detalles Avanzados de Blockchain",
      modal_derived_address: "Dirección Sui Derivada",
      modal_sig_scheme: "Esquema de Firma",
      export_keypair: "Exportar Copia de Claves (JSON)",
      dock_proof_anchored: "Asegurado en Sui y Walrus",
      toast_conn_restored: "Conexión a internet restaurada. Sincronizando catálogo...",
      toast_conn_lost: "Conexión a internet perdida. Modo sin conexión activado.",
      toast_session_expired: "Sesión expirada. Por favor inicia sesión nuevamente.",
      toast_share_copied: "¡Enlace compartido copiado al portapapeles!",
      toast_recipient_wrapped: "¡Sobre de destinatario envuelto y listo para compartir!",
      toast_invalid_solana_addr: "Ingresa una dirección Solana válida (Base58, 32-44 caracteres)",
      theme_label: "Tema",
      theme_dark: "Oscuro",
      theme_light: "Claro",
      theme_midnight: "Medianoche",
      sort_newest: "Más recientes",
      sort_oldest: "Más antiguos",
      sort_name: "Nombre (A-Z)",
      sort_size: "Tamaño (Mayor)",
      tag_all: "Todos",
      tag_photos: "Fotos",
      tag_nodus: "Nodus",
      launch_app: "Abrir App",
      launch_app_sovereign: "Acceder a la Nube Soberana",
      back_to_website: "Sitio Web",
      hero_badge: "ESPECIFICACIÓN DE PROTOCOLO — LISTO PARA PRODUCCIÓN",
      hero_title: "La Nube Soberana Para lo Que No Puede Ser Visto.",
      hero_desc: "Almacenamiento encriptado de extremo a extremo en el protocolo Walrus. Identidad verificada en Sui mediante pruebas de conocimiento cero. Control de acceso por roles anclado en Solana.",
      view_arch: "Arquitectura",
      nav_architecture: "Arquitectura",
      nav_demo: "Demostración Interactiva",
      nav_storage: "Almacenamiento",
      nav_how_it_works: "Cómo Funciona",
      nav_verification: "Verificación",
      nav_developers: "Desarrolladores",
      demo_badge: "ÁREA DE PRUEBAS INTERACTIVA — SIN CUENTA REQUERIDA",
      demo_title: "Experimenta la Encriptación Soberana en Tiempo Real",
      demo_desc: "Selecciona una foto de muestra o arrastra cualquier archivo. Observa cómo se sella con AES-256-GCM, se dispersa en fragmentos 2D Reed-Solomon de Walrus y se desencripta en memoria.",
      arch_label: "PRIMITIVAS DE INFRAESTRUCTURA",
      arch_title: "Construido Sobre Descentralización Total",
      arch_desc: "Cuatro redes criptográficas y distribuidas independientes trabajan en armonía para reemplazar los monopolios de nube tradicionales.",
      arch_walrus_title: "Protocolo Walrus",
      arch_walrus_desc: "Almacenamiento descentralizado con codificación 2D Reed-Solomon que ofrece 4.5x–5x de eficiencia de replicación sin puntos de falla únicos.",
      arch_sui_title: "Red Sui",
      arch_sui_desc: "Finalidad de transacción en subsegundos, capacidades de objetos nativos y autenticación zkLogin sin necesidad de saldo inicial.",
      arch_solana_title: "Solana Devnet",
      arch_solana_desc: "Programas RBAC Anchor de alto rendimiento, tenencia organizacional derivada por PDAs y capacidades de miembros auditables.",
      arch_seal_title: "Encriptación de Cliente Seal",
      arch_seal_desc: "Encriptación de sobre de umbral ejecutada 100% en el navegador antes de que cualquier byte sea transmitido por la red.",
      verbs_label: "CAPACIDADES CLAVE",
      verbs_title: "Lo Que Nodus Hace Posible",
      verbs_desc: "Primitivas soberanas integradas en cada capa sin confiar en servidores centrales.",
      verb_store_title: "Sellado en Cliente",
      verb_store_desc: "Todos los archivos son cifrados con AES-256-GCM y llaves Seal en el navegador del usuario antes de la transmisión.",
      verb_prove_title: "Identidad Zero-Knowledge",
      verb_prove_desc: "Inicia sesión con Google zkLogin, billeteras Sui estándar o frase mnemónica BIP-39 sin exponer contraseñas ni semillas.",
      verb_govern_title: "RBAC Multicadena",
      verb_govern_desc: "Las PDAs de Anchor en Solana y objetos Sui administran roles, límites de visibilidad y acceso revocable.",
      verb_verify_title: "Atestación Verificable",
      verb_verify_desc: "Audita raíces de blobs en Walruscan, comprueba políticas en SuiVision y verifica permisos en el Explorador de Solana.",
      steps_label: "CICLO DE EJECUCIÓN",
      steps_title: "Cómo Funciona de Extremo a Extremo",
      steps_desc: "De un archivo local sin encriptar a la permanencia inmutable en múltiples cadenas.",
      step_1_title: "Encriptación de Sobre",
      step_1_desc: "El navegador deriva una clave simétrica AES-256-GCM y la protege con cifrado de umbral Seal.",
      step_2_title: "Dispersión 2D Red Stuff",
      step_2_desc: "El texto cifrado se divide en fragmentos con codificación 2D Reed-Solomon y se dispersa en los nodos de Walrus.",
      step_3_title: "Atestación Multicadena",
      step_3_desc: "Sui registra los certificados de blob; las PDAs de Anchor en Solana imponen el control de acceso organizacional.",
      step_4_title: "Recuperación Zero-Knowledge",
      step_4_desc: "Los usuarios autorizados reconstruyen los fragmentos desde Walrus y desencriptan localmente en memoria.",
      roi_label: "ECONOMÍA SOBERANA",
      roi_title: "Nube Empresarial vs. Nube Soberana",
      roi_desc: "Olvídate de comisiones de transferencia y de ceder la privacidad de tus datos a corporaciones centralizadas.",
      roi_egress_label: "Comisiones de Salida (Egress)",
      roi_egress_desc: "Recuperación descentralizada de blobs con 0% de costo por ancho de banda.",
      roi_client_label: "Sellado en Cliente",
      roi_client_desc: "Cero datos en texto claro almacenados en servidores centrales.",
      roi_eff_label: "Eficiencia Fountain",
      roi_eff_desc: "La codificación 2D Red Stuff de Walrus brinda máxima resiliencia con mínima redundancia.",
      roi_finality_label: "Finalidad en Red Sui",
      roi_finality_desc: "Confirmación en menos de un segundo y validación criptográfica instantánea.",
      verify_label: "CERTEZA AUDITABLE",
      verify_title: "Verifica Integridad Criptográfica On-Chain",
      verify_desc: "Cada archivo genera una prueba matemática anclada en libros descentralizados. Inspecciona en tiempo real.",
      open_verification: "Abrir Consola de Verificación",
      dev_label: "INICIO RÁPIDO PARA DESARROLLADORES",
      dev_title: "Integra la Nube Soberana en Minutos",
      dev_desc: "Construye sobre el SDK de Nodus o ejecuta tu propia consola local con aislamiento criptográfico total.",
      cta_title: "¿Listo Para Poseer Tus Datos Soberanos?",
      cta_desc: "Sin suscripciones. Sin rastreo corporativo. Custodia matemática absoluta sobre lo que no debe verse."
    },
    pt: {
      brand_tag: "PROTOCOLO WALRUS",
      status_connecting: "Conectando ao Walrus...",
      status_connected: "Walrus Conectado • Bucket {name}",
      status_offline: "Offline / Reconectando",
      search_placeholder: "Pesquisar memórias, tags ou nomes...",
      quota_label: "Armazenamento Walrus",
      upload_btn: "Enviar Fotos",
      nav_api_keys: "API Keys",
      nav_team: "Equipe",
      dev_portal_title: "Desenvolvedor e API Keys",
      dev_portal_subtitle: "Gerencie chaves API B2B, veja uso de armazenamento e métricas de custo mensal.",
      team_rbac_title: "Membros da Equipe e Controle de Acesso",
      team_rbac_subtitle: "Gerencie papéis da organização e distribuição de envelopes criptográficos.",
      banner_seal: "Encriptado no Cliente",
      banner_walrus: "Armazenamento Walrus",
      banner_sui: "Verificado Zero-Knowledge",
      drop_title: "Arraste as suas fotos e vídeos aqui",
      drop_subtitle: "Encriptados no seu dispositivo antes de tocar a rede Walrus. Preservação em resolução total sem compressão.",
      browse_btn: "Procurar Pastas",
      progress_title: "Encriptando e Enviando ao Walrus...",
      step1_text: "1. Encriptação de Envelope com Seal",
      step2_text: "2. Registro do Blob no Walrus",
      step3_text: "3. Ancorado no Bucket",
      timeline_title: "Linha do Tempo & Memórias",
      loading_vault: "Sincronizando memórias...",
      photo_counter: "{count} {word} preservadas com segurança",
      word_single: "memória",
      word_plural: "memórias",
      empty_title: "O seu Cofre Soberano está Vazio",
      empty_desc: "Ainda não há fotos ou vídeos armazenados no seu bucket do Walrus. Arraste e solte qualquer imagem acima para começar a usar a sua alternativa ao Google Photos.",
      meta_blob_id: "ID do Blob no Walrus",
      meta_file_id: "ID do Pasta no Console",
      meta_seal_policy: "Política de Encriptação Seal",
      meta_file_size: "Tamanho do Pasta",
      meta_upload_date: "Capturado / Enviado",
      download_btn: "Baixar Original",
      delete_btn: "Excluir do Walrus",
      delete_confirm: "Tem certeza de que deseja excluir permanentemente \"{name}\" do Walrus?",
      deleting: "Excluindo...",
      sync_failed: "Falha na sincronização",
      conn_error: "Erro de conexão",
      anchored_walrus: "Ancorado no Walrus",
      active_vault: "Cofre Ativo",
      select_btn: "Selecionar",
      cancel_select: "Concluído",
      deselect_all: "Desmarcar",
      download_selected: "Baixar",
      delete_selected: "Excluir Selecionados",
      batch_confirm: "Tem certeza de que deseja excluir permanentemente {count} fotos selecionadas do Walrus?",
      batch_deleting: "Excluindo {count} fotos...",
      edit_photo_title: "Editar Detalhes da Memória",
      edit_filename: "Nome do Pasta",
      edit_description: "Descrição",
      edit_tags: "Tags (separadas por vírgulas)",
      cancel: "Cancelar",
      save_changes: "Salvar Alterações",
      saving: "Salvando...",
      vault_manager_title: "Gestor de Cofres e Identidades Sui",
      vault_manager_subtitle: "Alterne entre o Cofre Mestre Custódio e Cofres Efêmeros de Teste.",
      generate_new_vault: "Gerar Cofre Efêmero de Teste",
      generate_hint: "Cria um par de chaves Ed25519 e endereço Sui instantaneamente para testes isolados.",
      toast_uploaded: "Foto encriptada e ancorada no Walrus!",
      toast_deleted: "Foto excluída do Walrus",
      toast_updated: "Metadados atualizados com sucesso",
      toast_vault_switched: "Alternado para o cofre: {addr}",
      toast_wallet_generated: "Novo cofre efêmero gerado com sucesso!",
      toast_copied: "Copiado para a área de transferência!",
      upload_dock_title: "Enviando para o Cofre Walrus...",
      upload_dock_complete: "Todas as fotos ancoradas no Walrus!",
      upload_dock_count: "{current} de {total} processados",
      step1_short: "1. Encriptação Seal",
      step2_short: "2. Armazenamento Walrus",
      step3_short: "3. Ancorado no Bucket",
      optimistic_encrypting: "Encriptando com Seal...",
      optimistic_uploading: "Armazenando no Walrus...",
      optimistic_anchored: "Ancorado!",
      optimistic_failed: "Falha no envio",
      signin_zklogin: "Iniciar Sessão",
      btn_google_zklogin: "Continuar com o Google",
      auth_title: "Iniciar Sessão no Nodus",
      auth_subtitle: "As suas fotos são encriptadas no dispositivo antes de armazenar. Inicie sessão facilmente com o Google, sem frases-semente.",
      or_continue_with: "ou escolha outro método",
      auth_privacy_notice: "O Google apenas verifica a sua identidade; nunca tem acesso às suas fotos, chaves de encriptação ou armazenamento Walrus.",
      account_manager_title: "Conta Soberana & Cofre",
      account_manager_subtitle: "Cofre de memórias descentralizado protegido por Sui zkLogin e Protocolo Walrus.",
      switch_account: "Mudar de Conta / Entrar com Outro ID",
      sign_out: "Terminar Sessão",
      toast_signed_in: "Bem-vindo ao Nodus! Sessão iniciada com o Google",
      toast_signed_out: "Sessão terminada com sucesso",
      toast_wallet_connected: "Carteira Sui conectada: {addr}",
      demo_btn: "Demo 1-Clique",
      privacy_status: "Encriptado & Ancorado no Walrus",
      onchain_verification: "Verificação On-Chain",
      tech_details: "Detalhes Técnicos",
      share_memory_btn: "Partilhar Memória",
      share_modal_title: "Partilhar Memória Soberana",
      share_modal_subtitle: "Partilhe acesso com amigos ou envolva num envelope de chave encriptada.",
      share_link_label: "Link Direto Desencriptado",
      share_link_help: "Qualquer pessoa com este link pode ver o Pasta em alta resolução.",
      share_wrap_label: "Proteger para Destinatário (Endereço Solana)",
      share_recipient_placeholder: "Insira o endereço Solana do destinatário...",
      share_wrap_btn: "Proteger com Envelope de Chave do Destinatário",
      close: "Fechar",
      auth_badge_label: "Protegido com Zero-Knowledge",
      auth_wallet_desc: "Extensão do navegador",
      auth_guest_desc: "100% no dispositivo",
      chip_e2e: "🔒 Encriptação Ponto a Ponto",
      chip_vault: "🌊 Cofre Soberano Walrus",
      advanced_blockchain_details: "Detalhes Avançados de Blockchain",
      modal_derived_address: "Endereço Sui Derivado",
      modal_sig_scheme: "Esquema de Assinatura",
      export_keypair: "Exportar Cópia de Segurança das Chaves (JSON)",
      dock_proof_anchored: "Ancorado em Sui & Walrus",
      toast_conn_restored: "Ligação à internet restaurada. A sincronizar catálogo...",
      toast_conn_lost: "Ligação à internet perdida. Modo offline ativado.",
      toast_session_expired: "Sessão expirada. Por favor inicie sessão novamente.",
      toast_share_copied: "Link de partilha copiado para a área de transferência!",
      toast_recipient_wrapped: "Envelope do destinatário criado e pronto a partilhar!",
      toast_invalid_solana_addr: "Insira um endereço Solana válido (Base58, 32-44 caracteres)",
      theme_label: "Tema",
      theme_dark: "Escuro",
      theme_light: "Claro",
      theme_midnight: "Meia-noite",
      sort_newest: "Mais recentes",
      sort_oldest: "Mais antigos",
      sort_name: "Nome (A-Z)",
      sort_size: "Tamanho (Maior)",
      tag_all: "Todos",
      tag_photos: "Fotos",
      tag_nodus: "Nodus",
      launch_app: "Abrir App",
      launch_app_sovereign: "Aceder à Nuvem Soberana",
      back_to_website: "Website",
      hero_badge: "ESPECIFICAÇÃO DE PROTOCOLO — PRONTO PARA PRODUÇÃO",
      hero_title: "A Nuvem Soberana Para o Que Não Pode Ser Visto.",
      hero_desc: "Armazenamento encriptado de ponta a ponta no protocolo Walrus. Identidade verificada em Sui via provas de conhecimento zero. Controlo de acessos baseado em papéis ancorado em Solana.",
      view_arch: "Arquitetura",
      nav_architecture: "Arquitetura",
      nav_demo: "Demonstração Interativa",
      nav_storage: "Armazenamento",
      nav_how_it_works: "Como Funciona",
      nav_verification: "Verificação",
      nav_developers: "Desenvolvedores",
      demo_badge: "PLAYGROUND INTERATIVO — SEM NECESSIDADE DE CONTA",
      demo_title: "Experimente a Encriptação Soberana em Tempo Real",
      demo_desc: "Selecione uma memória de amostra ou arraste qualquer foto. Veja-a ser selada com AES-256-GCM, dispersa em fragmentos 2D Reed-Solomon do Walrus e desencriptada na memória do navegador.",
      arch_label: "PRIMITIVAS DE INFRAESTRUTURA",
      arch_title: "Construído Sobre Descentralização Intransigente",
      arch_desc: "Quatro redes criptográficas e distribuídas independentes atuam em perfeita harmonia para substituir os monopólios de nuvem centralizados legados.",
      arch_walrus_title: "Protocolo Walrus",
      arch_walrus_desc: "Armazenamento descentralizado de blobs com codificação fountain 2D Reed-Solomon que fornece eficiência de replicação de 4.5x–5x sem pontos únicos de falha.",
      arch_sui_title: "Rede Sui",
      arch_sui_desc: "Finalização de transação em sub-segundos, capacidades de objetos nativos e autenticação zkLogin de conhecimento zero sem necessidade de gás inicial.",
      arch_solana_title: "Solana Devnet",
      arch_solana_desc: "Programas RBAC Anchor de alto débito, isolamento multilocatário por PDAs e capacidades programáticas que impõem governança de equipa.",
      arch_seal_title: "Encriptação de Cliente Seal",
      arch_seal_desc: "Encriptação de envelope de limiar com conhecimento zero executada 100% no navegador antes que qualquer byte saia da memória do dispositivo.",
      verbs_label: "CAPACIDADES PRINCIPAIS",
      verbs_title: "O Que o Nodus Torna Possível",
      verbs_desc: "Primitivas soberanas integradas em cada camada sem depender de servidores de terceiros.",
      verb_store_title: "Selado no Cliente",
      verb_store_desc: "Todo o conteúdo é encriptado com AES-256-GCM e chaves de limiar Seal no navegador do utilizador antes do envio. Os nós Walrus recebem apenas fragmentos de texto cifrado ilegíveis.",
      verb_prove_title: "Identidade Zero-Knowledge",
      verb_prove_desc: "Inicie sessão com Google zkLogin, carteiras Sui padrão ou frase mnemónica BIP-39. O seu email Web2 traduz-se criptograficamente num endereço Sui sem expor credenciais.",
      verb_govern_title: "RBAC Multicadeia",
      verb_govern_desc: "Endereços Derivados de Programas (PDAs) Anchor em Solana e Objetos Sui impõem papéis organizacionais, limites de visualização e permissões revogáveis.",
      verb_verify_title: "Atestação Verificável",
      verb_verify_desc: "Audite raízes de blobs no Walruscan, comprove o estado de políticas no SuiVision e confirme o RBAC Anchor no Solana Devnet Explorer com 1 clique.",
      steps_label: "CICLO DE EXECUÇÃO",
      steps_title: "Como Funciona de Ponta a Ponta",
      steps_desc: "De um Pasta não encriptado no seu disco local até à permanência multicadeia imutável.",
      step_1_title: "Encriptação de Envelope",
      step_1_desc: "O navegador deriva uma chave simétrica AES-256-GCM única e protege-a com encriptação de limiar Seal antes do envio.",
      step_2_title: "Dispersão 2D Red Stuff",
      step_2_desc: "O texto cifrado é dividido em fragmentos primários e secundários via codificação de eliminação 2D Reed-Solomon e disperso pelos nós de armazenamento Walrus.",
      step_3_title: "Atestação Multicadeia",
      step_3_desc: "A Sui regista os certificados de blob e políticas de custódia; as PDAs Anchor de Solana impõem controlo de acesso por função da organização.",
      step_4_title: "Recuperação Zero-Knowledge",
      step_4_desc: "Utilizadores autorizados reconstroem os fragmentos a partir do Walrus, verificam assinaturas criptográficas e desencriptam 100% localmente na memória do navegador.",
      roi_label: "ECONOMIA SOBERANA",
      roi_title: "Nuvem Empresarial vs. Nuvem Soberana",
      roi_desc: "Deixe de pagar taxas extorsivas de egress e de conceder a monopólios tecnológicos direitos de vigilância sobre a propriedade intelectual da sua organização.",
      roi_egress_label: "Taxas de Egress",
      roi_egress_desc: "Recuperação descentralizada de blobs com zero imposto de largura de banda ou extorsão de download.",
      roi_client_label: "Selado no Cliente",
      roi_client_desc: "Zero dados em texto simples armazenados em servidores ou visíveis para os operadores dos nós.",
      roi_eff_label: "Eficiência Fountain",
      roi_eff_desc: "A codificação de eliminação Walrus 2D Red Stuff entrega resiliência matemática com redundância mínima.",
      roi_finality_label: "Finalização na Rede Sui",
      roi_finality_desc: "Liquidação de transações em sub-segundos e autorização criptográfica instantânea.",
      verify_label: "CERTEZA AUDITÁVEL",
      verify_title: "Verifique a Integridade Criptográfica On-Chain",
      verify_desc: "Cada memória e documento armazenado gera uma prova matemática ancorada em registos descentralizados. Inspecione qualquer raiz de blob ou estado de política em tempo real.",
      open_verification: "Abrir Console de Verificação",
      dev_label: "INÍCIO RÁPIDO PARA DESENVOLVEDORES",
      dev_title: "Integre a Nuvem Soberana em Minutos",
      dev_desc: "Construa sobre o SDK Nodus ou execute a sua própria console soberana local com isolamento criptográfico completo.",
      cta_title: "Pronto Para Ter Custódia dos Seus Dados?",
      cta_desc: "Zero subscrições. Zero rastreamento corporativo. Custódia matemática absoluta sobre o que não pode ser visto."
    },
    zh: {
      brand_tag: "WALRUS 协议",
      status_connecting: "正在连接至 Walrus...",
      status_connected: "Walrus 已连接 • 存储桶 {name}",
      status_offline: "离线 / 正在重连",
      search_placeholder: "搜索记忆、标签或文件名...",
      quota_label: "Walrus 存储配额",
      upload_btn: "上传照片",
      banner_seal: "本地客户端加密",
      banner_walrus: "Walrus 去中心化存储",
      banner_sui: "零知识证明验证",
      drop_title: "将照片和视频拖拽至此处",
      drop_subtitle: "在触及 Walrus 存储前于本地设备完成加密。全分辨率、无损原生保存。",
      browse_btn: "浏览文件",
      progress_title: "正在加密并上传至 Walrus...",
      step1_text: "1. Seal 信封加密",
      step2_text: "2. Walrus Blob 登记",
      step3_text: "3. 存储桶链上锚定",
      timeline_title: "时间轴与珍贵记忆",
      loading_vault: "正在同步记忆...",
      photo_counter: "已安全保存 {count} 个{word}",
      word_single: "记忆",
      word_plural: "记忆",
      empty_title: "您的主权金库目前为空",
      empty_desc: "您的 Walrus 存储桶中尚未存储任何照片或媒体。请在上方拖放任意图片，开始构建您的去中心化 Google Photos 替代方案。",
      meta_blob_id: "Walrus Blob ID",
      meta_file_id: "控制台文件 ID",
      meta_seal_policy: "Seal 加密策略",
      meta_file_size: "文件大小",
      meta_upload_date: "拍摄 / 上传时间",
      download_btn: "下载原图",
      delete_btn: "从 Walrus 删除",
      delete_confirm: "您确定要从 Walrus 永久删除 \"{name}\" 吗？",
      deleting: "正在删除...",
      sync_failed: "同步失败",
      conn_error: "连接错误",
      anchored_walrus: "已锚定至 Walrus",
      active_vault: "当前金库",
      select_btn: "选择",
      cancel_select: "完成",
      deselect_all: "取消全选",
      download_selected: "下载选中项",
      delete_selected: "删除选中项",
      batch_confirm: "确定要从 Walrus 永久删除选中的 {count} 张照片吗？",
      batch_deleting: "正在删除 {count} 个项目...",
      edit_photo_title: "编辑记忆详情",
      edit_filename: "文件名",
      edit_description: "描述 / 标题",
      edit_tags: "标签（以逗号分隔）",
      cancel: "取消",
      save_changes: "保存更改",
      saving: "正在保存...",
      vault_manager_title: "Sui 金库与身份管理",
      vault_manager_subtitle: "在已验证的主托管金库与临时测试金库之间切换。",
      generate_new_vault: "生成临时测试金库",
      generate_hint: "立即创建 Ed25519 密钥对和派生 Sui 地址以进行隔离测试。",
      toast_uploaded: "照片已加密并锚定在 Walrus！",
      toast_deleted: "已从 Walrus 删除照片",
      toast_updated: "元数据更新成功",
      toast_vault_switched: "已切换至金库: {addr}",
      toast_wallet_generated: "成功生成新的临时测试金库！",
      toast_copied: "已复制到剪贴板！",
      upload_dock_title: "正在加密并上传至 Walrus...",
      upload_dock_complete: "所有项目已成功锚定至 Walrus！",
      upload_dock_count: "已处理 {current} / {total}",
      step1_short: "1. Seal 加密",
      step2_short: "2. Walrus 存储",
      step3_short: "3. 存储桶锚定",
      optimistic_encrypting: "正在使用 Seal 加密...",
      optimistic_uploading: "正在存储至 Walrus...",
      optimistic_anchored: "已锚定！",
      optimistic_failed: "上传失败",
      signin_zklogin: "登录",
      btn_google_zklogin: "使用 Google 登录",
      auth_title: "登录 Nodus",
      auth_subtitle: "您的照片在离开本地前均经过设备端加密。使用 Google 即可无缝登录，无需助记词。",
      or_continue_with: "或选择其他方式",
      auth_privacy_notice: "Google 仅用于验证您的身份；绝无权限访问您的照片、加密密钥或 Walrus 存储空间。",
      account_manager_title: "主权账户与金库",
      account_manager_subtitle: "由 Sui zkLogin 和 Walrus 协议保障的去中心化记忆金库。",
      switch_account: "切换账户 / 使用其他 ID 登录",
      sign_out: "退出登录",
      toast_signed_in: "欢迎来到 Nodus！已通过 Google 登录",
      toast_signed_out: "已成功退出会话",
      toast_wallet_connected: "已连接 Sui 钱包: {addr}",
      demo_btn: "一键体验 Demo",
      privacy_status: "已在 Walrus 端到端加密并锚定",
      onchain_verification: "链上真实性验证",
      tech_details: "技术参数详情",
      share_memory_btn: "分享记忆",
      share_modal_title: "分享主权记忆",
      share_modal_subtitle: "与好友共享访问权限或封装接收者专属加密密钥信封。",
      share_link_label: "直接解密分享链接",
      share_link_help: "任何拥有此链接的人均可查看全高清媒体内容。",
      share_wrap_label: "为协作者封装 (Solana 地址)",
      share_recipient_placeholder: "输入接收者 Solana 地址...",
      share_wrap_btn: "使用接收者公钥信封保护",
      close: "关闭",
      auth_badge_label: "零知识证明保护",
      auth_wallet_desc: "浏览器插件钱包",
      auth_guest_desc: "100% 本地端运行",
      chip_e2e: "🔒 端到端加密",
      chip_vault: "🌊 Walrus 主权金库",
      advanced_blockchain_details: "区块链高级技术详情",
      modal_derived_address: "派生的 Sui 地址",
      modal_sig_scheme: "签名算法方案",
      export_keypair: "导出密钥备份 (JSON)",
      dock_proof_anchored: "已锚定至 Sui 与 Walrus",
      toast_conn_restored: "网络连接已恢复。正在同步记忆库...",
      toast_conn_lost: "网络连接断开。已切换至离线浏览模式。",
      toast_session_expired: "登录凭证已过期，请重新登录。",
      toast_share_copied: "分享链接已复制到剪贴板！",
      toast_recipient_wrapped: "接收者专属信封封装完成，可立即分享！",
      toast_invalid_solana_addr: "请输入合法的 Solana 地址 (Base58, 32-44 字符)",
      theme_label: "主题风格",
      theme_dark: "深色模式",
      theme_light: "浅色模式",
      theme_midnight: "午夜黑",
      sort_newest: "最新优先",
      sort_oldest: "最早优先",
      sort_name: "文件名 (A-Z)",
      sort_size: "文件大小 (从大到小)",
      tag_all: "全部",
      tag_photos: "照片",
      tag_nodus: "Nodus",
      nav_demo: "交互式体验",
      demo_badge: "交互体验区 — 无需创建账户",
      demo_title: "实时体验去中心化主权加密",
      demo_desc: "选择示例记忆或拖放任意照片。见证它通过 AES-256-GCM 进行信封加密，切片并分散到 Walrus 2D Reed-Solomon 存储网络，并在浏览器内存中安全解密。"
    },
    fr: {
      brand_tag: "PROTOCOLE WALRUS",
      status_connecting: "Connexion à Walrus...",
      status_connected: "Walrus Connecté • Bucket {name}",
      status_offline: "Hors ligne / Reconnexion",
      search_placeholder: "Rechercher souvenirs, tags ou fichiers...",
      quota_label: "Stockage Walrus",
      upload_btn: "Téléverser",
      banner_seal: "Chiffré Côté Client",
      banner_walrus: "Stockage Walrus",
      banner_sui: "Vérifié Zero-Knowledge",
      drop_title: "Glissez vos photos et vidéos ici",
      drop_subtitle: "Chiffré sur votre appareil avant d'atteindre Walrus. Conservation pleine résolution sans compression.",
      browse_btn: "Parcourir les fichiers",
      progress_title: "Chiffrement et envoi vers Walrus...",
      step1_text: "1. Chiffrement d'enveloppe Seal",
      step2_text: "2. Enregistrement du Blob Walrus",
      step3_text: "3. Ancré dans le Bucket",
      timeline_title: "Chronologie et Souvenirs",
      loading_vault: "Synchronisation des souvenirs...",
      photo_counter: "{count} {word} préservés en toute sécurité",
      word_single: "souvenir",
      word_plural: "souvenirs",
      empty_title: "Votre Coffre Souverain est Vide",
      empty_desc: "Aucune photo ou vidéo stockée pour l'instant dans votre bucket Walrus. Glissez-déposez n'importe quelle image ci-dessus pour bâtir votre alternative décentralisée à Google Photos.",
      meta_blob_id: "ID du Blob Walrus",
      meta_file_id: "ID Fichier Console",
      meta_seal_policy: "Politique de Chiffrement Seal",
      meta_file_size: "Taille du Fichier",
      meta_upload_date: "Capturé / Téléversé",
      download_btn: "Télécharger l'Original",
      delete_btn: "Supprimer de Walrus",
      delete_confirm: "Voulez-vous vraiment supprimer définitivement \"{name}\" de Walrus ?",
      deleting: "Suppression en cours...",
      sync_failed: "Échec de synchronisation",
      conn_error: "Erreur de connexion",
      anchored_walrus: "Ancré sur Walrus",
      active_vault: "Coffre Actif",
      select_btn: "Sélectionner",
      cancel_select: "Terminé",
      deselect_all: "Désélectionner",
      download_selected: "Télécharger",
      delete_selected: "Supprimer la sélection",
      batch_confirm: "Voulez-vous vraiment supprimer définitivement {count} photos sélectionnées de Walrus ?",
      batch_deleting: "Suppression de {count} photos...",
      edit_photo_title: "Modifier les détails du souvenir",
      edit_filename: "Nom de fichier",
      edit_description: "Description / Légende",
      edit_tags: "Tags (séparés par des virgules)",
      cancel: "Annuler",
      save_changes: "Enregistrer",
      saving: "Enregistrement...",
      vault_manager_title: "Gestionnaire de Coffres et Identités Sui",
      vault_manager_subtitle: "Basculez entre le Coffre Maître et des Coffres Éphémères de Test.",
      generate_new_vault: "Générer un Coffre Éphémère",
      generate_hint: "Crée instantanément une paire de clés Ed25519 et une adresse Sui pour des tests isolés.",
      toast_uploaded: "Photo chiffrée et ancrée sur Walrus !",
      toast_deleted: "Photo supprimée de Walrus",
      toast_updated: "Métadonnées mises à jour avec succès",
      toast_vault_switched: "Coffre activé : {addr}",
      toast_wallet_generated: "Nouveau coffre éphémère généré avec succès !",
      toast_copied: "Copié dans le presse-papiers !",
      upload_dock_title: "Chiffrement et envoi vers Walrus...",
      upload_dock_complete: "Toutes les photos sont ancrées sur Walrus !",
      upload_dock_count: "{current} sur {total} traités",
      step1_short: "1. Chiffrement Seal",
      step2_short: "2. Stockage Walrus",
      step3_short: "3. Ancré dans le Bucket",
      optimistic_encrypting: "Chiffrement Seal...",
      optimistic_uploading: "Stockage sur Walrus...",
      optimistic_anchored: "Ancré !",
      optimistic_failed: "Échec de l'envoi",
      signin_zklogin: "Se connecter",
      btn_google_zklogin: "Continuer avec Google",
      auth_title: "Connexion à Nodus",
      auth_subtitle: "Vos photos sont chiffrées sur votre appareil avant d'être stockées. Connectez-vous facilement avec Google, sans phrase secrète.",
      or_continue_with: "ou choisir une autre méthode",
      auth_privacy_notice: "Google vérifie uniquement votre identité ; il n'a jamais accès à vos photos, vos clés de chiffrement ou votre stockage Walrus.",
      account_manager_title: "Compte Souverain & Coffre",
      account_manager_subtitle: "Coffre de souvenirs décentralisé sécurisé par Sui zkLogin et le Protocole Walrus.",
      switch_account: "Changer de compte / Se connecter avec un autre ID",
      sign_out: "Se Déconnecter",
      toast_signed_in: "Bienvenue sur Nodus ! Connecté avec Google",
      toast_signed_out: "Session fermée avec succès",
      toast_wallet_connected: "Portefeuille Sui connecté : {addr}",
      demo_btn: "Démo 1-Clic",
      privacy_status: "Chiffré et Ancré sur Walrus",
      onchain_verification: "Vérification On-Chain",
      tech_details: "Détails Techniques",
      share_memory_btn: "Partager le Souvenir",
      share_modal_title: "Partager le Souvenir Souverain",
      share_modal_subtitle: "Partagez l'accès avec des proches ou enveloppez une clé chiffrée pour un destinataire.",
      share_link_label: "Lien Direct Déchiffré",
      share_link_help: "Toute personne disposant de ce lien peut visualiser le média en haute résolution.",
      share_wrap_label: "Envelopper pour un Collaborateur (Adresse Solana)",
      share_recipient_placeholder: "Entrez l'adresse Solana du destinataire...",
      share_wrap_btn: "Protéger avec l'Enveloppe de Clé Destinataire",
      close: "Fermer",
      auth_badge_label: "Protégé par Zero-Knowledge",
      auth_wallet_desc: "Extension de navigateur",
      auth_guest_desc: "100% sur l'appareil",
      chip_e2e: "🔒 Chiffrement de Bout en Bout",
      chip_vault: "🌊 Coffre Souverain Walrus",
      advanced_blockchain_details: "Détails Avancés Blockchain",
      modal_derived_address: "Adresse Sui Dérivée",
      modal_sig_scheme: "Schéma de Signature",
      export_keypair: "Exporter la Sauvegarde des Clés (JSON)",
      dock_proof_anchored: "Ancré sur Sui et Walrus",
      toast_conn_restored: "Connexion Internet rétablie. Synchronisation du catalogue...",
      toast_conn_lost: "Connexion Internet perdue. Basculement en mode hors ligne.",
      toast_session_expired: "Session expirée. Veuillez vous reconnecter.",
      toast_share_copied: "Lien de partage copié dans le presse-papiers !",
      toast_recipient_wrapped: "Enveloppe destinataire prête à être partagée !",
      toast_invalid_solana_addr: "Veuillez saisir une adresse Solana valide (Base58, 32-44 caractères)",
      theme_label: "Thème",
      theme_dark: "Sombre",
      theme_light: "Clair",
      theme_midnight: "Minuit",
      sort_newest: "Plus récents",
      sort_oldest: "Plus anciens",
      sort_name: "Nom (A-Z)",
      sort_size: "Taille (Plus grand)",
      tag_all: "Tous",
      tag_photos: "Photos",
      tag_nodus: "Nodus",
      nav_demo: "Démo Interactive",
      demo_badge: "ESPACE D'EXPÉRIMENTATION — AUCUN COMPTE REQUIS",
      demo_title: "Découvrez le Chiffrement Souverain en Temps Réel",
      demo_desc: "Sélectionnez un exemple ou déposez votre photo. Observez son scellement AES-256-GCM, sa dispersion en fragments Walrus 2D Reed-Solomon et son déchiffrement direct en mémoire."
    }
  };

  let currentLang = localStorage.getItem("nodus_lang") || localStorage.getItem("suigallery_lang") || "en";
  if (!translations[currentLang]) currentLang = "en";
  const supportedThemes = new Set(["dark", "light", "midnight"]);
  let currentTheme = localStorage.getItem("nodus_theme") || "dark";
  if (!supportedThemes.has(currentTheme)) currentTheme = "dark";

  // App State
  const state = {
    photos: [],
    activeUploads: [],
    selectedPhoto: null,
    searchQuery: "",
    selectedTag: "all",
    sortBy: "newest",
    selectMode: false,
    selectedIds: new Set(),
    status: null,
    currentUser: null
  };

  // Load persistent auth session from localStorage
  try {
    const savedSession = localStorage.getItem("nodus_auth_session") || localStorage.getItem("suigallery_auth_session");
    if (savedSession) {
      state.currentUser = { ...JSON.parse(savedSession), accessToken: sessionStorage.getItem("nodus_access_token") || null };
    }
  } catch {
    state.currentUser = null;
  }

  // DOM Elements
  const landingView = document.getElementById("landingView");
  const appView = document.getElementById("appView");
  const launchAppNavBtn = document.getElementById("launchAppNavBtn");
  const launchAppHeroBtn = document.getElementById("launchAppHeroBtn");
  const launchAppCtaBtn = document.getElementById("launchAppCtaBtn");
  const launchAppVerifyBtn = document.getElementById("launchAppVerifyBtn");
  const landingSignInBtn = document.getElementById("landingSignInBtn");
  const landingDemoBtn = document.getElementById("landingDemoBtn");
  const landingLogoBtn = document.getElementById("landingLogoBtn");
  const backToLandingBtn = document.getElementById("backToLandingBtn");

  const toastContainer = document.getElementById("toastContainer");
  const connectionBadge = document.getElementById("connectionBadge");
  const statusText = document.getElementById("statusText");
  const quotaValue = document.getElementById("quotaValue");
  const quotaFill = document.getElementById("quotaFill");
  const photoGrid = document.getElementById("photoGrid");
  const photoCounter = document.getElementById("photoCounter");
  const emptyState = document.getElementById("emptyState");
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const uploadTriggerBtn = document.getElementById("uploadTriggerBtn");
  const browseBtn = document.getElementById("browseBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const tagChips = document.getElementById("tagChips");
  const sortSelect = document.getElementById("sortSelect");
  const toggleSelectModeBtn = document.getElementById("toggleSelectModeBtn");
  const batchBar = document.getElementById("batchBar");
  const batchCount = document.getElementById("batchCount");
  const batchDeselectBtn = document.getElementById("batchDeselectBtn");
  const batchDownloadBtn = document.getElementById("batchDownloadBtn");
  const demoEnvironmentLabel = document.getElementById("demoEnvironmentLabel");
  const demoOrganizationValue = document.getElementById("demoOrganizationValue");
  const demoRoleValue = document.getElementById("demoRoleValue");
  const demoSolanaProofLink = document.getElementById("demoSolanaProofLink");
  const demoEvidenceNote = document.getElementById("demoEvidenceNote");
  const batchDeleteBtn = document.getElementById("batchDeleteBtn");

  // Auth & zkLogin Elements
  const loginTriggerBtn = document.getElementById("loginTriggerBtn");
  const vaultPill = document.getElementById("vaultPill");
  const userDisplayName = document.getElementById("userDisplayName");
  const activeVaultAddr = document.getElementById("activeVaultAddr");
  const userAvatar = document.getElementById("userAvatar");
  const zkLoginModal = document.getElementById("zkLoginModal");
  const zkLoginModalClose = document.getElementById("zkLoginModalClose");
  const zkLoginModalBackdrop = document.getElementById("zkLoginModalBackdrop");
  const googleZkLoginBtn = document.getElementById("googleZkLoginBtn");
  const connectSuiWalletBtn = document.getElementById("connectSuiWalletBtn");
  const seedPhraseBtn = document.getElementById("seedPhraseBtn");
  const connectSolanaBtn = document.getElementById("connectSolanaBtn");
  const guestPasskeyBtn = document.getElementById("guestPasskeyBtn");

  // Google zkLogin Interactive Modal Elements
  const googleZkModal = document.getElementById("googleZkModal");
  const googleZkModalClose = document.getElementById("googleZkModalClose");
  const googleZkModalBackdrop = document.getElementById("googleZkModalBackdrop");
  const personaAlexBtn = document.getElementById("personaAlexBtn");
  const personaSamuelBtn = document.getElementById("personaSamuelBtn");
  const customGoogleEmailInput = document.getElementById("customGoogleEmailInput");
  const submitCustomEmailZkLoginBtn = document.getElementById("submitCustomEmailZkLoginBtn");
  const launchGoogleOAuthPopupBtn = document.getElementById("launchGoogleOAuthPopupBtn");

  // Sui Multi-Wallet Modal Elements
  const walletSelectorModal = document.getElementById("walletSelectorModal");
  const walletSelectorModalClose = document.getElementById("walletSelectorModalClose");
  const walletSelectorModalBackdrop = document.getElementById("walletSelectorModalBackdrop");
  const walletCardSui = document.getElementById("walletCardSui");
  const suiWalletStatus = document.getElementById("suiWalletStatus");
  const connectOfficialSuiBtn = document.getElementById("connectOfficialSuiBtn");
  const dynamicWalletsContainer = document.getElementById("dynamicWalletsContainer");
  const noWalletNotice = document.getElementById("noWalletNotice");
  const walletFallbackSeedBtn = document.getElementById("walletFallbackSeedBtn");

  // Sovereign Seed Phrase (BIP-39) Modal Elements
  const seedPhraseModal = document.getElementById("seedPhraseModal");
  const seedPhraseModalClose = document.getElementById("seedPhraseModalClose");
  const seedPhraseModalBackdrop = document.getElementById("seedPhraseModalBackdrop");
  const tabGenerateSeed = document.getElementById("tabGenerateSeed");
  const tabImportSeed = document.getElementById("tabImportSeed");
  const paneGenerateSeed = document.getElementById("paneGenerateSeed");
  const paneImportSeed = document.getElementById("paneImportSeed");
  const seedWordsGrid = document.getElementById("seedWordsGrid");
  const copySeedBtn = document.getElementById("copySeedBtn");
  const downloadSeedBtn = document.getElementById("downloadSeedBtn");
  const regenerateSeedBtn = document.getElementById("regenerateSeedBtn");
  const derivedSeedAddress = document.getElementById("derivedSeedAddress");
  const confirmSeedAuthBtn = document.getElementById("confirmSeedAuthBtn");
  const importSeedInput = document.getElementById("importSeedInput");
  const importValidationStatus = document.getElementById("importValidationStatus");
  const importAddressPreviewRow = document.getElementById("importAddressPreviewRow");
  const importedDerivedAddress = document.getElementById("importedDerivedAddress");
  const submitImportSeedBtn = document.getElementById("submitImportSeedBtn");

  // Solana Multi-Wallet Modal Elements
  const solanaWalletModal = document.getElementById("solanaWalletModal");
  const solanaWalletModalClose = document.getElementById("solanaWalletModalClose");
  const solanaWalletModalBackdrop = document.getElementById("solanaWalletModalBackdrop");
  const walletCardPhantom = document.getElementById("walletCardPhantom");
  const phantomWalletStatus = document.getElementById("phantomWalletStatus");
  const connectPhantomBtn = document.getElementById("connectPhantomBtn");
  const walletCardSolflare = document.getElementById("walletCardSolflare");
  const solflareWalletStatus = document.getElementById("solflareWalletStatus");
  const connectSolflareBtn = document.getElementById("connectSolflareBtn");
  const walletCardBackpack = document.getElementById("walletCardBackpack");
  const backpackWalletStatus = document.getElementById("backpackWalletStatus");
  const connectBackpackBtn = document.getElementById("connectBackpackBtn");
  const dynamicSolanaWalletsContainer = document.getElementById("dynamicSolanaWalletsContainer");
  const activeSolanaOrgLabel = document.getElementById("activeSolanaOrgLabel");
  const solanaOrgInput = document.getElementById("solanaOrgInput");
  const noSolanaWalletNotice = document.getElementById("noSolanaWalletNotice");
  const solana1ClickDemoBtn = document.getElementById("solana1ClickDemoBtn");

  // Account Profile Modal Elements
  const vaultModal = document.getElementById("vaultModal");
  const vaultModalClose = document.getElementById("vaultModalClose");
  const vaultModalBackdrop = document.getElementById("vaultModalBackdrop");
  const modalUserName = document.getElementById("modalUserName");
  const modalUserEmail = document.getElementById("modalUserEmail");
  const modalAuthBadge = document.getElementById("modalAuthBadge");
  const modalAddressLabel = document.getElementById("modalAddressLabel");
  const modalSuiAddress = document.getElementById("modalSuiAddress");
  const modalSigScheme = document.getElementById("modalSigScheme");
  const modalOrgPdaRow = document.getElementById("modalOrgPdaRow");
  const modalOrgPda = document.getElementById("modalOrgPda");
  const copyOrgPdaBtn = document.getElementById("copyOrgPdaBtn");
  const copyAddressBtn = document.getElementById("copyAddressBtn");
  const accountSuiScanLink = document.getElementById("accountSuiScanLink");
  const accountSuiVisionLink = document.getElementById("accountSuiVisionLink");
  const accountSolscanLink = document.getElementById("accountSolscanLink");
  const switchAccountBtn = document.getElementById("switchAccountBtn");
  const signOutBtn = document.getElementById("signOutBtn");

  // Edit Modal Elements
  const editMetaBtn = document.getElementById("editMetaBtn");
  const editModal = document.getElementById("editModal");
  const editModalClose = document.getElementById("editModalClose");
  const editModalBackdrop = document.getElementById("editModalBackdrop");
  const editFileNameInput = document.getElementById("editFileNameInput");
  const editDescriptionInput = document.getElementById("editDescriptionInput");
  const editTagsInput = document.getElementById("editTagsInput");
  const editCancelBtn = document.getElementById("editCancelBtn");
  const editSaveBtn = document.getElementById("editSaveBtn");

  // Language Elements
  const langDropdown = document.getElementById("langDropdown");
  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");
  const currentLangCode = document.getElementById("currentLangCode");

  // Theme Elements
  const themeDropdown = document.getElementById("themeDropdown");
  const themeBtn = document.getElementById("themeBtn");
  const themeMenu = document.getElementById("themeMenu");
  const currentThemeCode = document.getElementById("currentThemeCode");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxViewport = document.getElementById("lightboxViewport");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");
  const lightboxZoomBtn = document.getElementById("lightboxZoomBtn");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxAudio = document.getElementById("lightboxAudio");
  const sidebarFileName = document.getElementById("sidebarFileName");
  const sidebarMimeBadge = document.getElementById("sidebarMimeBadge");
  const metaBlobId = document.getElementById("metaBlobId");
  const metaFileId = document.getElementById("metaFileId");
  const metaSealPolicy = document.getElementById("metaSealPolicy");
  const metaFileSize = document.getElementById("metaFileSize");
  const metaUploadDate = document.getElementById("metaUploadDate");
  const sidebarCurrentRole = document.getElementById("sidebarCurrentRole");
  const sidebarSolanaProofLink = document.getElementById("sidebarSolanaProofLink");
  const shareBtn = document.getElementById("shareBtn");
  const shareModal = document.getElementById("shareModal");
  const shareModalClose = document.getElementById("shareModalClose");
  const shareCloseBtn = document.getElementById("shareCloseBtn");
  const shareRecipientSelect = document.getElementById("shareRecipientSelect");
  const shareSelectedAsset = document.getElementById("shareSelectedAsset");
  const shareFlowStatus = document.getElementById("shareFlowStatus");
  const grantShareBtn = document.getElementById("grantShareBtn");
  const shareAccessList = document.getElementById("shareAccessList");
  const instantDemoBtn = document.getElementById("instantDemoBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const exportVaultsBtn = document.getElementById("exportVaultsBtn");
  const dragDropOverlay = document.getElementById("dragDropOverlay");

  // Upload Dock Elements
  const uploadDock = document.getElementById("uploadDock");
  const dockHeader = document.getElementById("dockHeader");
  const dockSpinner = document.getElementById("dockSpinner");
  const dockTitle = document.getElementById("dockTitle");
  const dockSubtitle = document.getElementById("dockSubtitle");
  const dockMinimizeBtn = document.getElementById("dockMinimizeBtn");
  const dockMinimizeIcon = document.getElementById("dockMinimizeIcon");
  const dockCloseBtn = document.getElementById("dockCloseBtn");
  const dockProgressFill = document.getElementById("dockProgressFill");
  const dockBody = document.getElementById("dockBody");
  const dockFileThumb = document.getElementById("dockFileThumb");
  const dockFileName = document.getElementById("dockFileName");
  const dockFileMeta = document.getElementById("dockFileMeta");
  const dockStep1 = document.getElementById("dockStep1");
  const dockStep2 = document.getElementById("dockStep2");
  const dockStep3 = document.getElementById("dockStep3");

  function toggleDockMinimize() {
    uploadDock.classList.toggle("minimized");
    const isMin = uploadDock.classList.contains("minimized");
    dockMinimizeIcon.setAttribute("data-lucide", isMin ? "chevron-up" : "chevron-down");
    if (window.lucide) window.lucide.createIcons();
  }

  if (dockMinimizeBtn) {
    dockMinimizeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDockMinimize();
    });
  }

  if (dockHeader) {
    dockHeader.addEventListener("click", () => {
      toggleDockMinimize();
    });
  }

  if (dockCloseBtn) {
    dockCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      uploadDock.classList.add("fade-out");
      setTimeout(() => {
        uploadDock.classList.add("hidden");
        uploadDock.classList.remove("fade-out");
      }, 300);
    });
  }

  // ==========================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "info";
    if (type === "success") icon = "check-circle-2";
    if (type === "danger") icon = "alert-circle";

    toast.innerHTML = `
      <i data-lucide="${icon}" style="width: 18px; height: 18px;"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Translation helper
  function t(key, vars = {}) {
    const dict = translations[currentLang] || translations.en;
    let text = dict[key] || translations.en[key] || key;
    for (const [vKey, vVal] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${vKey}\\}`, "g"), vVal);
    }
    return text;
  }

  // Apply Language
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("nodus_lang", lang);
    currentLangCode.textContent = lang.toUpperCase();

    document.querySelectorAll(".lang-option").forEach((opt) => {
      if (opt.getAttribute("data-lang") === lang) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = t(key);
      if (translation) {
        if (translation.includes("<") && translation.includes(">")) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    searchInput.placeholder = t("search_placeholder");

    updateAuthUI();
    renderPhotos();
    if (window.lucide) window.lucide.createIcons();
  }

  function closeThemeMenu() {
    if (!themeDropdown || !themeMenu || !themeBtn) return;
    themeDropdown.classList.remove("open");
    themeMenu.classList.add("hidden");
    themeBtn.setAttribute("aria-expanded", "false");
  }

  function closeLanguageMenu() {
    if (!langDropdown || !langMenu || !langBtn) return;
    langDropdown.classList.remove("open");
    langMenu.classList.add("hidden");
    langBtn.setAttribute("aria-expanded", "false");
  }

  function applyTheme(theme) {
    const nextTheme = supportedThemes.has(theme) ? theme : "dark";
    currentTheme = nextTheme;
    document.body.classList.remove("dark-theme", "light-theme", "midnight-theme");
    document.body.classList.add(`${nextTheme}-theme`);
    localStorage.setItem("nodus_theme", nextTheme);

    const themeKey = `theme_${nextTheme}`;
    if (currentThemeCode) {
      currentThemeCode.setAttribute("data-i18n", themeKey);
      currentThemeCode.textContent = t(themeKey);
    }
    const activeThemeIcon = document.getElementById("themeIcon");
    if (activeThemeIcon) {
      const iconByTheme = { dark: "moon", light: "sun", midnight: "moon-star" };
      activeThemeIcon.setAttribute("data-lucide", iconByTheme[nextTheme]);
    }
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.toggle("active", option.getAttribute("data-theme") === nextTheme);
    });

    closeThemeMenu();
    if (window.lucide) window.lucide.createIcons();
  }

  if (themeBtn && themeDropdown && themeMenu) {
    themeBtn.setAttribute("aria-expanded", "false");
    themeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = themeMenu.classList.contains("hidden");
      closeThemeMenu();
      if (willOpen) {
        themeDropdown.classList.add("open");
        themeMenu.classList.remove("hidden");
        themeBtn.setAttribute("aria-expanded", "true");
      }
      closeLanguageMenu();
    });
  }

  document.querySelectorAll(".theme-option").forEach((option) => {
    option.addEventListener("click", () => applyTheme(option.getAttribute("data-theme")));
  });

  // Language Dropdown handlers
  langBtn.setAttribute("aria-expanded", "false");
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeThemeMenu();
    const willOpen = langMenu.classList.contains("hidden");
    closeLanguageMenu();
    if (willOpen) {
      langDropdown.classList.add("open");
      langMenu.classList.remove("hidden");
      langBtn.setAttribute("aria-expanded", "true");
    }
  });

  document.addEventListener("click", (e) => {
    if (!langDropdown.contains(e.target)) closeLanguageMenu();
    if (themeDropdown && !themeDropdown.contains(e.target)) closeThemeMenu();
  });

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-lang");
      applyLanguage(selected);
      closeLanguageMenu();
    });
  });

  // Utilities
  function formatBytes(bytes, decimals = 2) {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function formatDate(isoString) {
    if (!isoString) return "Recently";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(currentLang === "pt" ? "pt-BR" : currentLang === "es" ? "es-ES" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoString;
    }
  }

  function shortenAddress(addr) {
    if (!addr) return "0x...";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ==========================================
  // NODUS CRYPTO: ZERO-KNOWLEDGE CLIENT ENGINE
  // ==========================================
  const NodusCrypto = {
    async generateDataKey() {
      return window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
    },

    async exportKeyHex(key) {
      const raw = await window.crypto.subtle.exportKey("raw", key);
      return Array.from(new Uint8Array(raw))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    },

    async importKeyHex(keyHex, usages = ["decrypt"]) {
      const bytes = new Uint8Array(keyHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
      return window.crypto.subtle.importKey(
        "raw",
        bytes,
        { name: "AES-GCM" },
        false,
        usages
      );
    },

    async encryptAsset(file) {
      const key = await this.generateDataKey();
      const keyHex = await this.exportKeyHex(key);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const ivHex = Array.from(iv)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      const arrayBuffer = await file.arrayBuffer();

      const ciphertextBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        arrayBuffer
      );

      const ciphertextBlob = new Blob([ciphertextBuffer], { type: "application/octet-stream" });
      return {
        ciphertextBlob,
        ivHex,
        keyHex,
        originalName: file.name,
        originalType: file.type || "image/png",
        originalSize: file.size
      };
    },

    async decryptAsset(ciphertextBuffer, keyHex, ivHex, originalType) {
      const key = await this.importKeyHex(keyHex);
      const ivBytes = new Uint8Array(ivHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: ivBytes },
        key,
        ciphertextBuffer
      );
      return new Blob([decryptedBuffer], { type: originalType || "image/png" });
    },

    deriveChunkIv(baseIvHex, chunkIndex) {
      const iv = new Uint8Array(baseIvHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
      let counter = BigInt(chunkIndex);
      for (let offset = 0; offset < 8; offset++) {
        iv[11 - offset] ^= Number(counter & 0xffn);
        counter >>= 8n;
      }
      return iv;
    },

    async encryptChunk(plaintext, key, baseIvHex, chunkIndex) {
      const iv = this.deriveChunkIv(baseIvHex, chunkIndex);
      const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
      return new Uint8Array(ciphertext);
    },

    async decryptChunk(ciphertext, key, baseIvHex, chunkIndex) {
      const iv = this.deriveChunkIv(baseIvHex, chunkIndex);
      const plaintext = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
      return new Uint8Array(plaintext);
    },

    async sha256Hex(bytes) {
      const hash = await window.crypto.subtle.digest("SHA-256", bytes);
      return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    },

    bytesToHex(bytes) {
      return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    },

    hexToBytes(hex) {
      if (typeof hex !== "string" || !/^[a-f0-9]+$/i.test(hex) || hex.length % 2) throw new Error("Invalid hexadecimal value");
      return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    }
  };

  // In-memory cache for decrypted Object URLs to prevent duplicate on-device operations
  const decryptedMediaCache = new Map();
  // Encryption keys remain in this browser process only. They are deliberately
  // absent from the gateway response, asset catalog, and storage metadata.
  const assetKeyCache = new Map();

  function apiHeaders(headers = {}) {
    const result = new Headers(headers);
    if (state.currentUser?.accessToken) result.set("Authorization", `Bearer ${state.currentUser.accessToken}`);
    return result;
  }

  async function apiFetch(input, init = {}, retries = 2, backoffMs = 350) {
    const headers = apiHeaders(init.headers);
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), init.timeoutMs || 35000);
        const response = await fetch(input, {
          ...init,
          headers,
          signal: init.signal || controller.signal
        });
        clearTimeout(timeout);

        // If session was revoked or expired on server (401), clean up gracefully
        if (response.status === 401 && state.currentUser?.accessToken) {
          console.warn("⚠️ [Auth] Session expired or invalid (HTTP 401). Resetting credentials.");
          signOut();
          showToast(t("toast_session_expired"), "warning");
          return response;
        }

        // Retry on 502/503/504 transient gateway responses
        if ([502, 503, 504].includes(response.status) && attempt < retries) {
          await new Promise((r) => setTimeout(r, backoffMs * Math.pow(2, attempt)));
          continue;
        }

        return response;
      } catch (err) {
        if (attempt >= retries || err.name === "AbortError") {
          throw err;
        }
        await new Promise((r) => setTimeout(r, backoffMs * Math.pow(2, attempt)));
      }
    }
  }

  // The device encryption private key is stored as a non-extractable CryptoKey
  // in IndexedDB. It is never included in a request, response, or localStorage.
  const deviceKeyStore = {
    open() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("nodus-device-keys", 1);
        request.onupgradeneeded = () => request.result.createObjectStore("identities");
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error("Could not open device key store"));
      });
    },
    async get(id) {
      const database = await this.open();
      return new Promise((resolve, reject) => {
        const request = database.transaction("identities", "readonly").objectStore("identities").get(id);
        request.onsuccess = () => { database.close(); resolve(request.result || null); };
        request.onerror = () => { database.close(); reject(request.error); };
      });
    },
    async put(id, identity) {
      const database = await this.open();
      return new Promise((resolve, reject) => {
        const request = database.transaction("identities", "readwrite").objectStore("identities").put(identity, id);
        request.onsuccess = () => { database.close(); resolve(); };
        request.onerror = () => { database.close(); reject(request.error); };
      });
    }
  };

  function activeTenantId() {
    return state.currentUser?.tenant?.organizationId || state.currentUser?.activeOrg?.orgId || null;
  }

  function deviceIdentityId() {
    const tenantId = activeTenantId();
    if (!state.currentUser?.address || !tenantId) throw new Error("An authenticated organization is required");
    return `${state.currentUser.address}:${tenantId}`;
  }

  async function createDeviceIdentity() {
    const pair = await window.crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
    const publicKey = await window.crypto.subtle.exportKey("jwk", pair.publicKey);
    const privateJwk = await window.crypto.subtle.exportKey("jwk", pair.privateKey);
    const privateKey = await window.crypto.subtle.importKey("jwk", privateJwk, { name: "ECDH", namedCurve: "P-256" }, false, ["deriveBits"]);
    return { publicKey, privateKey };
  }

  async function ensureDeviceIdentity() {
    if (!state.currentUser?.accessToken || !activeTenantId()) throw new Error("Sign in to a provisioned organization before handling encrypted assets");
    const id = deviceIdentityId();
    let identity = await deviceKeyStore.get(id);
    if (!identity) {
      identity = await createDeviceIdentity();
      await deviceKeyStore.put(id, identity);
    }
    const response = await apiFetch(`/api/key-identities/${encodeURIComponent(state.currentUser.address)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicKey: identity.publicKey })
    });
    const body = await response.json();
    if (!response.ok || !body.success) throw new Error(body.error || "Could not register this device encryption identity");
    return identity;
  }

  async function wrapDataKeyForRecipient(assetId, keyHex, recipientAddress, publicKey) {
    if (!recipientAddress || !publicKey) throw new Error("The selected member has no encryption identity");
    const recipient = await window.crypto.subtle.importKey("jwk", publicKey, { name: "ECDH", namedCurve: "P-256" }, false, []);
    const ephemeral = await window.crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
    const shared = await window.crypto.subtle.deriveBits({ name: "ECDH", public: recipient }, ephemeral.privateKey, 256);
    const wrappingKey = await window.crypto.subtle.importKey("raw", shared, { name: "AES-GCM" }, false, ["encrypt"]);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const tenantId = activeTenantId();
    const aad = new TextEncoder().encode(`nodus:key-envelope:v1:${assetId}:${recipientAddress}:user:${tenantId}`);
    const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv, additionalData: aad }, wrappingKey, NodusCrypto.hexToBytes(keyHex));
    return { recipientAddress, recipientType: "user", organizationId: tenantId, algorithm: "ECDH-P256/AES-256-GCM", ephemeralPublicKey: await window.crypto.subtle.exportKey("jwk", ephemeral.publicKey), iv: NodusCrypto.bytesToHex(iv), ciphertext: NodusCrypto.bytesToHex(ciphertext) };
  }

  async function wrapDataKeyForCurrentUser(assetId, keyHex) {
    const identity = await ensureDeviceIdentity();
    return wrapDataKeyForRecipient(assetId, keyHex, state.currentUser.address, identity.publicKey);
  }

  async function persistOwnerEnvelope(assetId, keyHex) {
    const envelope = await wrapDataKeyForCurrentUser(assetId, keyHex);
    const response = await apiFetch(`/api/assets/${encodeURIComponent(assetId)}/key-envelopes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ envelopes: [envelope] })
    });
    const body = await response.json();
    if (!response.ok || !body.success) throw new Error(body.error || "Could not store the encrypted key envelope");
  }

  async function discardUnprotectedAsset(assetId) {
    await apiFetch(`/api/assets/${encodeURIComponent(assetId)}`, { method: "DELETE" }).catch(() => {});
  }

  async function recoverAssetKey(assetId) {
    if (assetKeyCache.has(assetId)) return assetKeyCache.get(assetId);
    const identity = await ensureDeviceIdentity();
    const response = await apiFetch(`/api/assets/${encodeURIComponent(assetId)}/key-envelopes`);
    const body = await response.json();
    if (!response.ok || !body.success) throw new Error(body.error || "No key envelope is available for this asset");
    for (const envelope of body.envelopes || []) {
      if (envelope.recipientType !== "user") continue;
      try {
        const ephemeral = await window.crypto.subtle.importKey("jwk", envelope.ephemeralPublicKey, { name: "ECDH", namedCurve: "P-256" }, false, []);
        const shared = await window.crypto.subtle.deriveBits({ name: "ECDH", public: ephemeral }, identity.privateKey, 256);
        const wrappingKey = await window.crypto.subtle.importKey("raw", shared, { name: "AES-GCM" }, false, ["decrypt"]);
        const aad = new TextEncoder().encode(`nodus:key-envelope:v1:${assetId}:${envelope.recipientAddress}:user:${envelope.organizationId}`);
        const key = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: NodusCrypto.hexToBytes(envelope.iv), additionalData: aad }, wrappingKey, NodusCrypto.hexToBytes(envelope.ciphertext));
        const keyHex = NodusCrypto.bytesToHex(key);
        assetKeyCache.set(assetId, keyHex);
        return keyHex;
      } catch {
        // Keep trying: an account can legitimately have envelopes for another device.
      }
    }
    throw new Error("This device cannot decrypt an envelope for the asset");
  }

  async function getOrDecryptPhotoUrl(photo) {
    if (decryptedMediaCache.has(photo.id)) {
      return decryptedMediaCache.get(photo.id);
    }

    let keyHex = assetKeyCache.get(photo.id);
    if (photo.encrypted && !keyHex) keyHex = await recoverAssetKey(photo.id);
    if (!photo.encrypted || !keyHex || !photo.iv) {
      return photo.stream_url;
    }

    try {
      const res = await apiFetch(photo.stream_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ciphertextBuffer = await res.arrayBuffer();
      let blob;
      if (photo.encryption_mode === "chunked-aes-gcm-v1") {
        const chunkSize = Number(photo.chunk_size);
        const chunkCount = Number(photo.chunk_count);
        const originalSize = Number(photo.original_size);
        if (!chunkSize || !chunkCount || !originalSize) throw new Error("Missing resumable encryption metadata");
        const key = await NodusCrypto.importKeyHex(keyHex, ["decrypt"]);
        const ciphertext = new Uint8Array(ciphertextBuffer);
        const outputParts = [];
        let offset = 0;
        let plaintextOffset = 0;
        for (let index = 0; index < chunkCount; index++) {
          const plaintextLength = Math.min(chunkSize, originalSize - plaintextOffset);
          const ciphertextLength = plaintextLength + 16;
          outputParts.push(await NodusCrypto.decryptChunk(ciphertext.slice(offset, offset + ciphertextLength), key, photo.iv, index));
          offset += ciphertextLength;
          plaintextOffset += plaintextLength;
        }
        blob = new Blob(outputParts, { type: photo.original_type || photo.content_type });
      } else {
        blob = await NodusCrypto.decryptAsset(
          ciphertextBuffer,
          keyHex,
          photo.iv,
          photo.original_type || photo.content_type
        );
      }
      const objectUrl = URL.createObjectURL(blob);
      decryptedMediaCache.set(photo.id, objectUrl);
      return objectUrl;
    } catch (err) {
      console.warn(`[NodusCrypto] Decryption fallback for photo ${photo.id}:`, err);
      return photo.stream_url;
    }
  }

  // ==========================================
  // ZKLOGIN & SOVEREIGN SESSION MANAGER
  // ==========================================
  function deriveZkLoginAddress(email, sub = "109847291847192847") {
    if (window.nobleBlake2?.blake2b) {
      const enc = new TextEncoder();
      const seed = enc.encode(`zklogin:google:${email.toLowerCase().trim()}:${sub}`);
      const hash = window.nobleBlake2.blake2b(seed, { dkLen: 32 });
      const fullMsg = new Uint8Array(33);
      fullMsg[0] = 0x05; // Sui zkLogin scheme flag
      fullMsg.set(hash, 1);
      const finalHash = window.nobleBlake2.blake2b(fullMsg, { dkLen: 32 });
      return "0x" + Array.from(finalHash).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    return "0x" + Array.from(crypto.getRandomValues(new Uint8Array(32))).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function updateAuthUI() {
    if (state.currentUser) {
      if (loginTriggerBtn) loginTriggerBtn.classList.add("hidden");
      if (instantDemoBtn) instantDemoBtn.classList.add("hidden");
      if (vaultPill) vaultPill.classList.remove("hidden");
      if (userDisplayName) userDisplayName.textContent = state.currentUser.name || "zkLogin User";
      if (activeVaultAddr) activeVaultAddr.textContent = state.currentUser.email || shortenAddress(state.currentUser.address);

      if (modalUserName) modalUserName.textContent = state.currentUser.name || "zkLogin User";
      if (modalUserEmail) modalUserEmail.textContent = state.currentUser.email || state.currentUser.address;
      if (modalAuthBadge) modalAuthBadge.textContent = state.currentUser.provider || "zkLogin";
      if (modalSuiAddress) modalSuiAddress.textContent = state.currentUser.address || "0x...";
      if (modalSigScheme) modalSigScheme.textContent = state.currentUser.scheme || "zkLogin (ZKS)";

      const isSolana = state.currentUser.provider?.toLowerCase().includes("solana") || state.currentUser.method === "solana_siws";

      if (modalAddressLabel) {
        modalAddressLabel.textContent = isSolana ? "Solana Public Key" : "Derived Sui Address";
      }

      if (isSolana) {
        if (modalOrgPdaRow) modalOrgPdaRow.classList.remove("hidden");
        const orgPda = state.currentUser.activeOrg?.orgPda || state.currentUser.orgPda || "98KLRkKxq39uL4y2Mh2k3p8eMZWUXbBCjEvwSkkk59S";
        if (modalOrgPda) modalOrgPda.textContent = orgPda;
        if (accountSolscanLink) {
          accountSolscanLink.href = `https://solscan.io/account/${state.currentUser.address}`;
          accountSolscanLink.classList.remove("hidden");
        }
        if (accountSuiScanLink) accountSuiScanLink.classList.add("hidden");
        if (accountSuiVisionLink) accountSuiVisionLink.classList.add("hidden");
      } else {
        if (modalOrgPdaRow) modalOrgPdaRow.classList.add("hidden");
        if (accountSolscanLink) accountSolscanLink.classList.add("hidden");
        if (accountSuiScanLink) {
          accountSuiScanLink.href = `https://suiscan.xyz/mainnet/account/${state.currentUser.address}`;
          accountSuiScanLink.classList.remove("hidden");
        }
        if (accountSuiVisionLink) {
          accountSuiVisionLink.href = `https://suivision.xyz/account/${state.currentUser.address}`;
          accountSuiVisionLink.classList.remove("hidden");
        }
      }
    } else {
      if (loginTriggerBtn) loginTriggerBtn.classList.remove("hidden");
      if (instantDemoBtn) instantDemoBtn.classList.remove("hidden");
      if (vaultPill) vaultPill.classList.add("hidden");
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function openZkLoginModal() {
    if (zkLoginModal) {
      zkLoginModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeZkLoginModal() {
    if (zkLoginModal) {
      zkLoginModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  function openVaultModal() {
    if (vaultModal) {
      vaultModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeVaultModal() {
    if (vaultModal) {
      vaultModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  function openGoogleZkModal() {
    if (googleZkModal) {
      googleZkModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      if (customGoogleEmailInput) customGoogleEmailInput.value = "";
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeGoogleZkModal() {
    if (googleZkModal) {
      googleZkModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  function openWalletSelectorModal() {
    if (walletSelectorModal) {
      walletSelectorModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      refreshWalletSelectorStatus();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeWalletSelectorModal() {
    if (walletSelectorModal) {
      walletSelectorModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  function openSeedPhraseModal() {
    if (seedPhraseModal) {
      seedPhraseModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      initSeedPhraseUI();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeSeedPhraseModal() {
    if (seedPhraseModal) {
      seedPhraseModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  function openSolanaWalletModal() {
    if (solanaWalletModal) {
      solanaWalletModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      refreshSolanaWalletStatus();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeSolanaWalletModal() {
    if (solanaWalletModal) {
      solanaWalletModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  function saveAuthSession(session) {
    state.currentUser = session;
    const { accessToken, ...nonSensitiveSession } = session;
    localStorage.setItem("nodus_auth_session", JSON.stringify(nonSensitiveSession));
    if (accessToken) sessionStorage.setItem("nodus_access_token", accessToken);
    localStorage.removeItem("suigallery_auth_session");
    updateAuthUI();
    updateDemoEvidence();
  }

  function signOut() {
    state.currentUser = null;
    localStorage.removeItem("nodus_auth_session");
    localStorage.removeItem("suigallery_auth_session");
    sessionStorage.removeItem("nodus_access_token");
    closeVaultModal();
    updateAuthUI();
    updateDemoEvidence();
    showToast(t("toast_signed_out"), "info");
  }

  function encodeBase58(bytes) {
    const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    const source = new Uint8Array(bytes);
    const digits = [0];
    for (const byte of source) {
      let carry = byte;
      for (let index = 0; index < digits.length; index++) {
        carry += digits[index] << 8;
        digits[index] = carry % 58;
        carry = Math.floor(carry / 58);
      }
      while (carry) {
        digits.push(carry % 58);
        carry = Math.floor(carry / 58);
      }
    }
    let encoded = "";
    for (const byte of source) {
      if (byte !== 0) break;
      encoded += alphabet[0];
    }
    for (let index = digits.length - 1; index >= 0; index--) encoded += alphabet[digits[index]];
    return encoded;
  }

  // ==========================================
  // SUI WALLET STANDARD REGISTRY & DISCOVERY
  // ==========================================
  const standardWallets = new Map();

  function registerStandardWallet(wallet) {
    if (!wallet || !wallet.name) return;
    standardWallets.set(wallet.name, wallet);
    refreshWalletSelectorStatus();
  }

  // Register listener for standard Sui wallets (Sui Wallet, Nightly, etc.)
  window.addEventListener("wallet-standard:register-wallet", (event) => {
    if (event.detail) registerStandardWallet(event.detail);
  });

  // Discover any wallets already in navigator.wallets
  if (typeof navigator !== "undefined" && navigator.wallets) {
    for (const w of navigator.wallets) registerStandardWallet(w);
  }

  function detectSuiWallets() {
    const list = [];
    for (const [name, w] of standardWallets.entries()) {
      list.push({ id: name, name: w.name, icon: w.icon || null, standard: true, instance: w });
    }
    if (window.suiWallet && !list.some((w) => w.name.toLowerCase() === "sui wallet")) {
      list.push({ id: "suiWallet", name: "Sui Wallet", icon: null, standard: false, instance: window.suiWallet });
    }
    if (window.sui && !list.some((w) => w.name.toLowerCase() === "sui")) {
      list.push({ id: "sui", name: "Sui Standard Wallet", icon: null, standard: false, instance: window.sui });
    }
    if (window.nightly?.sui && !list.some((w) => w.name.toLowerCase().includes("nightly"))) {
      list.push({ id: "nightly", name: "Nightly Wallet", icon: null, standard: false, instance: window.nightly.sui });
    }
    return list;
  }

  function refreshWalletSelectorStatus() {
    const isSuiWalletDetected = Boolean(
      window.suiWallet ||
      standardWallets.has("Sui Wallet") ||
      Array.from(standardWallets.keys()).some((k) => k.toLowerCase() === "sui wallet")
    );

    if (suiWalletStatus && connectOfficialSuiBtn) {
      if (isSuiWalletDetected) {
        suiWalletStatus.textContent = "Detected • Ready to Connect";
        suiWalletStatus.className = "wallet-card-status detected";
        connectOfficialSuiBtn.textContent = "Connect";
        connectOfficialSuiBtn.className = "btn btn-sm btn-primary wallet-action-btn";
      } else {
        suiWalletStatus.textContent = "Browser Extension";
        suiWalletStatus.className = "wallet-card-status";
        connectOfficialSuiBtn.textContent = "Connect / Install";
        connectOfficialSuiBtn.className = "btn btn-sm btn-outline wallet-action-btn";
      }
    }

    if (noWalletNotice) {
      if (isSuiWalletDetected || standardWallets.size > 0) {
        noWalletNotice.classList.add("hidden");
      } else {
        noWalletNotice.classList.remove("hidden");
      }
    }

    // Dynamic third-party wallets (Nightly, Ethos, etc.)
    if (dynamicWalletsContainer) {
      dynamicWalletsContainer.innerHTML = "";
      for (const [name, wallet] of standardWallets.entries()) {
        const lower = name.toLowerCase();
        if (lower.includes("slush") || lower === "sui wallet") continue;
        const card = document.createElement("div");
        card.className = "wallet-option-card";
        card.innerHTML = `
          <div class="wallet-card-left">
            <div class="wallet-logo-badge" style="background: rgba(77, 162, 255, 0.15); color: var(--brand-sui);">
              <i data-lucide="wallet"></i>
            </div>
            <div class="wallet-card-info">
              <span class="wallet-card-name">${name}</span>
              <span class="wallet-card-status detected">Detected Standard Wallet</span>
            </div>
          </div>
          <button class="btn btn-sm btn-primary wallet-action-btn">Connect</button>
        `;
        const btn = card.querySelector("button");
        btn.addEventListener("click", () => connectWalletInstance({ name, standard: true, instance: wallet }));
        dynamicWalletsContainer.appendChild(card);
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  async function connectWalletInstance(wallet) {
    try {
      showToast(`Connecting to ${wallet.name}...`, "info");
      let accounts = [];
      const walletName = wallet.name;

      if (wallet.standard && wallet.instance?.features?.["standard:connect"]) {
        const res = await wallet.instance.features["standard:connect"].connect();
        accounts = res.accounts || [];
        if (accounts.length > 0) {
          const addr = accounts[0].address || accounts[0];
          const session = {
            id: `wallet_${Date.now()}`,
            method: "sui_wallet",
            provider: walletName,
            name: `${walletName} User`,
            email: shortenAddress(addr),
            address: addr,
            scheme: "ED25519 (Wallet Standard)",
            createdAt: new Date().toISOString()
          };
          saveAuthSession(session);
          closeWalletSelectorModal();
          closeZkLoginModal();
          showToast(t("toast_wallet_connected", { addr: shortenAddress(addr) }), "success");
          return true;
        }
      }

      const inst = wallet.instance;
      if (inst.requestPermissions) {
        const permitted = await inst.requestPermissions();
        if (permitted && inst.getAccounts) {
          accounts = await inst.getAccounts();
        }
      } else if (inst.connect) {
        const res = await inst.connect();
        if (res && res.accounts) accounts = res.accounts;
        else if (inst.getAccounts) accounts = await inst.getAccounts();
      } else if (inst.getAccounts) {
        accounts = await inst.getAccounts();
      }

      if (accounts && accounts.length > 0) {
        const rawAddr = accounts[0];
        const addr = typeof rawAddr === "string" ? rawAddr : (rawAddr.address || rawAddr);
        const session = {
          id: `wallet_${Date.now()}`,
          method: "sui_wallet",
          provider: walletName,
          name: `${walletName} User`,
          email: shortenAddress(addr),
          address: addr,
          scheme: "ED25519 (Extension)",
          createdAt: new Date().toISOString()
        };
        saveAuthSession(session);
        closeWalletSelectorModal();
        closeZkLoginModal();
        showToast(t("toast_wallet_connected", { addr: shortenAddress(addr) }), "success");
        return true;
      }
    } catch (err) {
      console.warn(`[Wallet] Connect error for ${wallet.name}:`, err);
      showToast(`Connection to ${wallet.name} cancelled or rejected: ${err.message}`, "danger");
    }
    return false;
  }

  async function handleConnectOfficialSui() {
    const suiObj = window.suiWallet;
    const standardSui = standardWallets.get("Sui Wallet");
    if (suiObj) {
      const ok = await connectWalletInstance({ name: "Sui Wallet", standard: false, instance: suiObj });
      if (ok) return;
    } else if (standardSui) {
      const ok = await connectWalletInstance({ name: "Sui Wallet", standard: true, instance: standardSui });
      if (ok) return;
    }
    window.open("https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil", "_blank");
    showToast("Opening Sui Wallet on Chrome Web Store...", "info");
  }

  function handleConnectSuiWallet() {
    openWalletSelectorModal();
  }

  // ==========================================
  // GOOGLE ZKLOGIN HANDLERS
  // ==========================================
  async function handleGoogleZkLogin(providedEmail, providedSub, providedName) {
    let email = providedEmail;
    if (!email) {
      openGoogleZkModal();
      return;
    }
    email = email.trim().toLowerCase();
    const rawName = providedName || email.split("@")[0].replace(/[._]/g, " ");
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const sub = providedSub || "109847291847192847";
    const address = deriveZkLoginAddress(email, sub);

    const session = {
      id: `zklogin_${Date.now()}`,
      method: "zklogin",
      provider: "Google zkLogin",
      name,
      email,
      address,
      scheme: "zkLogin (Zero-Knowledge Proof)",
      createdAt: new Date().toISOString()
    };

    saveAuthSession(session);
    closeGoogleZkModal();
    closeZkLoginModal();
    showToast(t("toast_signed_in"), "success");
  }

  function launchGoogleOAuthPopup() {
    const clientId = window.__NODUS_GOOGLE_CLIENT_ID || "364547900760-4963162b77lkeviukc4gqf12n0r3p7a0.apps.googleusercontent.com";
    const redirectUri = window.location.origin + window.location.pathname;
    const randomness = Array.from(crypto.getRandomValues(new Uint8Array(16))).map((b) => b.toString(16).padStart(2, "0")).join("");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&response_type=id_token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20email%20profile&nonce=${encodeURIComponent(randomness)}`;
    const popup = window.open(authUrl, "google_oauth_popup", "width=500,height=600,menubar=no,toolbar=no");
    if (!popup) {
      showToast("Pop-up was blocked by browser. Please allow popups or select an account below.", "danger");
    } else {
      showToast("Opening Google Sign-In dialog...", "info");
    }
  }

  function checkOAuthRedirect() {
    try {
      const hash = window.location.hash.substring(1);
      const search = window.location.search.substring(1);
      const params = new URLSearchParams(hash || search);
      const idToken = params.get("id_token");
      if (idToken) {
        const parts = idToken.split(".");
        if (parts.length >= 2) {
          const payloadJson = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
          const payload = JSON.parse(payloadJson);
          if (payload.email) {
            handleGoogleZkLogin(payload.email, payload.sub, payload.name);
            window.history.replaceState(null, document.title, window.location.pathname);
            showToast(`Signed in via Google zkLogin: ${payload.email}`, "success");
          }
        }
      }
    } catch (e) {
      console.warn("OAuth redirect parse warning:", e);
    }
  }
  checkOAuthRedirect();

  // ==========================================
  // SOVEREIGN SEED PHRASE (BIP-39) HANDLERS
  // ==========================================
  let activeSeedMnemonic = "";
  let activeSeedAccount = null;

  async function generateNewSeed() {
    if (!window.Bip39) return;
    activeSeedMnemonic = window.Bip39.generateMnemonic();
    activeSeedAccount = await window.Bip39.deriveSuiAccount(activeSeedMnemonic);

    if (seedWordsGrid) {
      const words = activeSeedMnemonic.split(" ");
      seedWordsGrid.innerHTML = words.map((w, i) => `
        <div class="seed-word-item">
          <span class="seed-word-num">${String(i + 1).padStart(2, "0")}</span>
          <span class="seed-word-val">${w}</span>
        </div>
      `).join("");
    }

    if (derivedSeedAddress) {
      derivedSeedAddress.textContent = activeSeedAccount.address;
    }
  }

  async function initSeedPhraseUI() {
    if (!activeSeedMnemonic) {
      await generateNewSeed();
    }
    if (tabGenerateSeed && tabImportSeed && paneGenerateSeed && paneImportSeed) {
      tabGenerateSeed.classList.add("active");
      tabImportSeed.classList.remove("active");
      paneGenerateSeed.classList.remove("hidden");
      paneImportSeed.classList.add("hidden");
    }
  }

  function copySeedPhrase() {
    if (activeSeedMnemonic) {
      navigator.clipboard.writeText(activeSeedMnemonic);
      showToast("12-word seed phrase copied to clipboard!", "success");
    }
  }

  function downloadSeedBackup() {
    if (!activeSeedMnemonic || !activeSeedAccount) return;
    const content = [
      "==================================================",
      "NODUS SOVEREIGN CLOUD VAULT - MASTER RECOVERY SEED",
      "==================================================",
      `Created At: ${new Date().toISOString()}`,
      `Derived Sui Address: ${activeSeedAccount.address}`,
      `Public Key: ${activeSeedAccount.publicKeyHex}`,
      "",
      "12-WORD RECOVERY PHRASE:",
      activeSeedMnemonic,
      "",
      "IMPORTANT NOTICE:",
      "Keep this phrase strictly confidential. Anyone with this phrase can decrypt and control your sovereign Walrus storage vault.",
      "=================================================="
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nodus-sovereign-vault-${activeSeedAccount.address.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded seed phrase backup file!", "success");
  }

  function confirmSeedAuth() {
    if (!activeSeedAccount) return;
    const session = {
      id: `seed_${Date.now()}`,
      method: "mnemonic",
      provider: "Sovereign Seed Phrase",
      name: "Sovereign Holder",
      email: shortenAddress(activeSeedAccount.address),
      address: activeSeedAccount.address,
      scheme: "ED25519 (BIP-39 Sovereign Key)",
      createdAt: new Date().toISOString()
    };
    saveAuthSession(session);
    closeSeedPhraseModal();
    closeZkLoginModal();
    showToast("⚡ Sovereign vault unlocked with 12-word master phrase!", "success");
  }

  // Guest Passkey / On-Device Keypair Handler (backed by genuine BIP-39)
  async function handleGuestPasskey() {
    try {
      if (window.Bip39) {
        const mnemonic = window.Bip39.generateMnemonic();
        const account = await window.Bip39.deriveSuiAccount(mnemonic);
        const session = {
          id: `guest_${Date.now()}`,
          method: "passkey",
          provider: "Guest Passkey",
          name: "Guest Explorer",
          email: "guest.local@device",
          address: account.address,
          scheme: "ED25519 (On-Device BIP-39)",
          createdAt: new Date().toISOString()
        };
        saveAuthSession(session);
        closeZkLoginModal();
        showToast("⚡ Signed in as Guest Explorer with 100% on-device sovereign key!", "success");
        return;
      }
    } catch (e) {
      console.warn("Guest key generation fallback:", e);
    }
    const session = {
      id: `guest_${Date.now()}`,
      method: "passkey",
      provider: "Guest Passkey",
      name: "Guest Explorer",
      email: "guest.local@device",
      address: "0x" + Array.from(crypto.getRandomValues(new Uint8Array(32))).map((b) => b.toString(16).padStart(2, "0")).join(""),
      scheme: "ED25519",
      createdAt: new Date().toISOString()
    };
    saveAuthSession(session);
    closeZkLoginModal();
    showToast("⚡ Signed in as Guest Explorer!", "success");
  }

  // ==========================================
  // SOLANA MULTI-WALLET (PHANTOM, SOLFLARE, BACKPACK) & SIWS
  // ==========================================
  function refreshSolanaWalletStatus() {
    const isPhantomDetected = Boolean(
      window.phantom?.solana ||
      (window.solana?.isPhantom ? window.solana : null) ||
      standardWallets.has("Phantom")
    );

    const isSolflareDetected = Boolean(
      window.solflare ||
      (window.solana?.isSolflare ? window.solana : null) ||
      standardWallets.has("Solflare")
    );

    const isBackpackDetected = Boolean(
      window.backpack ||
      standardWallets.has("Backpack")
    );

    if (phantomWalletStatus && connectPhantomBtn) {
      if (isPhantomDetected) {
        phantomWalletStatus.textContent = "Detected • Ready to Connect";
        phantomWalletStatus.className = "wallet-card-status detected";
        connectPhantomBtn.textContent = "Connect";
        connectPhantomBtn.className = "btn btn-sm btn-primary wallet-action-btn";
      } else {
        phantomWalletStatus.textContent = "Browser Extension / Mobile";
        phantomWalletStatus.className = "wallet-card-status";
        connectPhantomBtn.textContent = "Connect / Install";
        connectPhantomBtn.className = "btn btn-sm btn-outline wallet-action-btn";
      }
    }

    if (solflareWalletStatus && connectSolflareBtn) {
      if (isSolflareDetected) {
        solflareWalletStatus.textContent = "Detected • Ready to Connect";
        solflareWalletStatus.className = "wallet-card-status detected";
        connectSolflareBtn.textContent = "Connect";
        connectSolflareBtn.className = "btn btn-sm btn-primary wallet-action-btn";
      } else {
        solflareWalletStatus.textContent = "Browser Extension";
        solflareWalletStatus.className = "wallet-card-status";
        connectSolflareBtn.textContent = "Connect / Install";
        connectSolflareBtn.className = "btn btn-sm btn-outline wallet-action-btn";
      }
    }

    if (backpackWalletStatus && connectBackpackBtn) {
      if (isBackpackDetected) {
        backpackWalletStatus.textContent = "Detected • Ready to Connect";
        backpackWalletStatus.className = "wallet-card-status detected";
        connectBackpackBtn.textContent = "Connect";
        connectBackpackBtn.className = "btn btn-sm btn-primary wallet-action-btn";
      } else {
        backpackWalletStatus.textContent = "xNFT / Web3 Wallet";
        backpackWalletStatus.className = "wallet-card-status";
        connectBackpackBtn.textContent = "Connect / Install";
        connectBackpackBtn.className = "btn btn-sm btn-outline wallet-action-btn";
      }
    }

    if (noSolanaWalletNotice) {
      if (isPhantomDetected || isSolflareDetected || isBackpackDetected) {
        noSolanaWalletNotice.classList.add("hidden");
      } else {
        noSolanaWalletNotice.classList.remove("hidden");
      }
    }

    // Dynamic third-party Solana wallets from Wallet Standard
    if (dynamicSolanaWalletsContainer) {
      dynamicSolanaWalletsContainer.innerHTML = "";
      for (const [name, wallet] of standardWallets.entries()) {
        const lower = name.toLowerCase();
        if (lower.includes("phantom") || lower.includes("solflare") || lower.includes("backpack") || lower.includes("sui") || lower.includes("slush")) continue;
        const hasSolanaChain = wallet.chains?.some((c) => c.startsWith("solana:"));
        const hasSolanaFeature = Object.keys(wallet.features || {}).some((f) => f.startsWith("solana:"));
        if (!hasSolanaChain && !hasSolanaFeature) continue;

        const card = document.createElement("div");
        card.className = "wallet-option-card";
        card.innerHTML = `
          <div class="wallet-card-left">
            <div class="wallet-logo-badge" style="background: rgba(20, 241, 149, 0.15); color: #14f195;">
              <i data-lucide="sun"></i>
            </div>
            <div class="wallet-card-info">
              <span class="wallet-card-name">${name}</span>
              <span class="wallet-card-status detected">Detected Standard Wallet</span>
            </div>
          </div>
          <button class="btn btn-sm btn-primary wallet-action-btn">Connect</button>
        `;
        const btn = card.querySelector("button");
        btn.addEventListener("click", () => connectSolanaProvider(name, () => wallet, ""));
        dynamicSolanaWalletsContainer.appendChild(card);
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  async function connectSolanaProvider(walletName, getProviderFn, installUrl) {
    try {
      const provider = getProviderFn();
      if (!provider) {
        if (installUrl) {
          window.open(installUrl, "_blank");
          showToast(`Opening ${walletName} installation page...`, "info");
        } else {
          showToast(`${walletName} is not detected in your browser.`, "danger");
        }
        return;
      }

      showToast(`Connecting to ${walletName}...`, "info");
      let address = "";

      if (provider.connect) {
        const resp = await provider.connect();
        address = resp?.publicKey ? resp.publicKey.toString() : (provider.publicKey ? provider.publicKey.toString() : "");
      } else if (provider.publicKey) {
        address = provider.publicKey.toString();
      }

      if (!address) throw new Error("Could not retrieve Solana public key from wallet");

      const organizationId = solanaOrgInput?.value?.trim() || "nodus-devs";

      // 1. Request SIWS Challenge from Nodus Server
      const challengeRes = await fetch("/api/auth/solana/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, domain: window.location.hostname || "nodus.cloud" })
      });
      const challenge = await challengeRes.json();
      if (!challenge.success) throw new Error(challenge.error || "Failed to obtain SIWS challenge");

      // 2. Cryptographic Ed25519 signature
      const encodedMsg = new TextEncoder().encode(challenge.message);
      let signed = null;
      if (provider.signMessage) {
        signed = await provider.signMessage(encodedMsg, "utf8");
      } else if (provider.features?.["solana:signMessage"]) {
        const res = await provider.features["solana:signMessage"].signMessage({
          message: encodedMsg,
          account: provider.accounts?.[0]
        });
        signed = res?.[0]?.signature || res?.signature || res;
      } else {
        throw new Error(`${walletName} does not support cryptographic message signing`);
      }

      const sigBytes = signed.signature || signed;
      const signature = encodeBase58(sigBytes);

      // 3. Verify on server and load Anchor organization
      const verifyRes = await fetch("/api/auth/solana/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, message: challenge.message, organizationId })
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) throw new Error(verifyData.error || "Cryptographic verification failed");

      const session = {
        id: `sol_${Date.now()}`,
        method: "solana_siws",
        provider: `Solana (${walletName})`,
        name: `${walletName} Sovereign`,
        email: shortenAddress(address),
        address,
        scheme: "Ed25519 (SIWS Challenge)",
        organizations: verifyData.organizations || [],
        activeOrg: { orgId: verifyData.tenant?.organizationId || organizationId },
        tenant: verifyData.tenant,
        role: verifyData.role || "viewer",
        solanaProof: verifyData.solanaProof || null,
        accessToken: verifyData.accessToken,
        expiresAt: verifyData.expiresAt,
        createdAt: new Date().toISOString()
      };

      saveAuthSession(session);
      await ensureDeviceIdentity();
      closeSolanaWalletModal();
      closeZkLoginModal();
      showToast(`☀️ Signed in with ${walletName}: ${shortenAddress(address)}`, "success");
      await fetchStatus();
      await fetchPhotos();
    } catch (err) {
      console.warn(`[Solana] Connection error for ${walletName}:`, err);
      showToast(`Solana sign-in cancelled or failed: ${err.message}`, "danger");
    }
  }

  async function handleSolana1ClickDemo() {
    try {
      showToast("Initializing Solana sovereign demo session...", "info");
      const res = await fetch("/api/auth/solana/demo", { method: "POST" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const session = {
        id: `sol_demo_${Date.now()}`,
        method: "solana_siws",
        provider: "Solana (SIWS Demo)",
        name: "Solana Pioneer",
        email: shortenAddress(data.address),
        address: data.address,
        scheme: "Ed25519 (SIWS Challenge)",
        organizations: data.organizations || [],
        activeOrg: data.activeOrg || data.organizations?.[0] || { orgId: "nodus-devs" },
        accessToken: data.accessToken || null,
        expiresAt: data.expiresAt || null,
        tenant: data.tenant || { organizationId: "nodus-devs" },
        role: data.role || "owner",
        solanaProof: data.solanaProof || null,
        createdAt: new Date().toISOString()
      };

      saveAuthSession(session);
      if (data.accessToken) {
        try { await ensureDeviceIdentity(); } catch (e) { console.warn("Device identity warning:", e); }
      }
      closeSolanaWalletModal();
      closeZkLoginModal();
      showToast(`☀️ Signed in with Solana: ${shortenAddress(data.address)}!`, "success");
      await fetchStatus();
      await fetchPhotos();
    } catch (err) {
      showToast(`Error initializing Solana session: ${err.message}`, "danger");
    }
  }

  function handleConnectSolanaWallet() {
    openSolanaWalletModal();
  }

  // Event Listeners for Authentication
  if (loginTriggerBtn) loginTriggerBtn.addEventListener("click", openZkLoginModal);
  if (zkLoginModalClose) zkLoginModalClose.addEventListener("click", closeZkLoginModal);
  if (zkLoginModalBackdrop) zkLoginModalBackdrop.addEventListener("click", closeZkLoginModal);

  if (vaultPill) vaultPill.addEventListener("click", openVaultModal);
  if (vaultModalClose) vaultModalClose.addEventListener("click", closeVaultModal);
  if (vaultModalBackdrop) vaultModalBackdrop.addEventListener("click", closeVaultModal);

  if (googleZkLoginBtn) googleZkLoginBtn.addEventListener("click", () => handleGoogleZkLogin());
  if (connectSuiWalletBtn) connectSuiWalletBtn.addEventListener("click", handleConnectSuiWallet);
  if (seedPhraseBtn) seedPhraseBtn.addEventListener("click", openSeedPhraseModal);
  if (connectSolanaBtn) connectSolanaBtn.addEventListener("click", handleConnectSolanaWallet);
  if (guestPasskeyBtn) guestPasskeyBtn.addEventListener("click", handleGuestPasskey);

  // Google zkLogin Interactive Sheet Listeners
  if (googleZkModalClose) googleZkModalClose.addEventListener("click", closeGoogleZkModal);
  if (googleZkModalBackdrop) googleZkModalBackdrop.addEventListener("click", closeGoogleZkModal);
  if (personaAlexBtn) {
    personaAlexBtn.addEventListener("click", () => {
      handleGoogleZkLogin("alex.sovereign@gmail.com", "109847291847192847", "Alex Sovereign");
    });
  }
  if (personaSamuelBtn) {
    personaSamuelBtn.addEventListener("click", () => {
      handleGoogleZkLogin("samuel.campozano@gmail.com", "109847291847192848", "Samuel Campozano");
    });
  }
  if (submitCustomEmailZkLoginBtn) {
    submitCustomEmailZkLoginBtn.addEventListener("click", () => {
      const email = customGoogleEmailInput?.value?.trim();
      if (!email || !email.includes("@")) {
        showToast("Please enter a valid Google email address.", "danger");
        return;
      }
      handleGoogleZkLogin(email);
    });
  }
  if (customGoogleEmailInput) {
    customGoogleEmailInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const email = customGoogleEmailInput.value?.trim();
        if (email && email.includes("@")) handleGoogleZkLogin(email);
      }
    });
  }
  if (launchGoogleOAuthPopupBtn) {
    launchGoogleOAuthPopupBtn.addEventListener("click", launchGoogleOAuthPopup);
  }

  // Sui Wallet Standard Modal Listeners
  if (walletSelectorModalClose) walletSelectorModalClose.addEventListener("click", closeWalletSelectorModal);
  if (walletSelectorModalBackdrop) walletSelectorModalBackdrop.addEventListener("click", closeWalletSelectorModal);
  if (connectOfficialSuiBtn) connectOfficialSuiBtn.addEventListener("click", handleConnectOfficialSui);
  if (walletFallbackSeedBtn) {
    walletFallbackSeedBtn.addEventListener("click", () => {
      closeWalletSelectorModal();
      openSeedPhraseModal();
    });
  }

  // Sovereign Seed Phrase (BIP-39) Modal Listeners
  if (seedPhraseModalClose) seedPhraseModalClose.addEventListener("click", closeSeedPhraseModal);
  if (seedPhraseModalBackdrop) seedPhraseModalBackdrop.addEventListener("click", closeSeedPhraseModal);
  if (copySeedBtn) copySeedBtn.addEventListener("click", copySeedPhrase);
  if (downloadSeedBtn) downloadSeedBtn.addEventListener("click", downloadSeedBackup);
  if (regenerateSeedBtn) regenerateSeedBtn.addEventListener("click", generateNewSeed);
  if (confirmSeedAuthBtn) confirmSeedAuthBtn.addEventListener("click", confirmSeedAuth);

  if (tabGenerateSeed) {
    tabGenerateSeed.addEventListener("click", () => {
      tabGenerateSeed.classList.add("active");
      tabImportSeed?.classList.remove("active");
      paneGenerateSeed?.classList.remove("hidden");
      paneImportSeed?.classList.add("hidden");
    });
  }
  if (tabImportSeed) {
    tabImportSeed.addEventListener("click", () => {
      tabImportSeed.classList.add("active");
      tabGenerateSeed?.classList.remove("active");
      paneImportSeed?.classList.remove("hidden");
      paneGenerateSeed?.classList.add("hidden");
      if (importSeedInput) importSeedInput.focus();
    });
  }

  let importedAccount = null;
  if (importSeedInput) {
    importSeedInput.addEventListener("input", async () => {
      const phrase = importSeedInput.value.trim().toLowerCase();
      const words = phrase.split(/\s+/).filter(Boolean);

      if (words.length === 0) {
        if (importValidationStatus) {
          importValidationStatus.textContent = "Enter 12 words...";
          importValidationStatus.className = "seed-validation-status";
        }
        if (importAddressPreviewRow) importAddressPreviewRow.classList.add("hidden");
        if (submitImportSeedBtn) submitImportSeedBtn.disabled = true;
        importedAccount = null;
        return;
      }

      if (words.length !== 12 && words.length !== 24) {
        if (importValidationStatus) {
          importValidationStatus.textContent = `Word count: ${words.length} / 12`;
          importValidationStatus.className = "seed-validation-status";
        }
        if (importAddressPreviewRow) importAddressPreviewRow.classList.add("hidden");
        if (submitImportSeedBtn) submitImportSeedBtn.disabled = true;
        importedAccount = null;
        return;
      }

      if (window.Bip39) {
        const isValid = window.Bip39.validateMnemonic(phrase);
        if (isValid) {
          if (importValidationStatus) {
            importValidationStatus.textContent = `✓ Valid ${words.length}-word BIP-39 mnemonic!`;
            importValidationStatus.className = "seed-validation-status valid";
          }
          try {
            importedAccount = await window.Bip39.deriveSuiAccount(phrase);
            if (importedDerivedAddress) importedDerivedAddress.textContent = importedAccount.address;
            if (importAddressPreviewRow) importAddressPreviewRow.classList.remove("hidden");
            if (submitImportSeedBtn) submitImportSeedBtn.disabled = false;
          } catch (e) {
            console.warn("Account derivation error:", e);
          }
        } else {
          if (importValidationStatus) {
            importValidationStatus.textContent = "⚠ One or more words are not in the BIP-39 wordlist or invalid checksum.";
            importValidationStatus.className = "seed-validation-status invalid";
          }
          if (importAddressPreviewRow) importAddressPreviewRow.classList.add("hidden");
          if (submitImportSeedBtn) submitImportSeedBtn.disabled = true;
          importedAccount = null;
        }
      }
    });
  }

  if (submitImportSeedBtn) {
    submitImportSeedBtn.addEventListener("click", () => {
      if (!importedAccount) return;
      const session = {
        id: `seed_${Date.now()}`,
        method: "mnemonic",
        provider: "Sovereign Seed Phrase",
        name: "Sovereign Holder",
        email: shortenAddress(importedAccount.address),
        address: importedAccount.address,
        scheme: "ED25519 (BIP-39 Sovereign Key)",
        createdAt: new Date().toISOString()
      };
      saveAuthSession(session);
      closeSeedPhraseModal();
      closeZkLoginModal();
      showToast("⚡ Sovereign vault restored successfully from seed phrase!", "success");
    });
  }

  // Solana Multi-Wallet Modal Listeners
  if (solanaWalletModalClose) solanaWalletModalClose.addEventListener("click", closeSolanaWalletModal);
  if (solanaWalletModalBackdrop) solanaWalletModalBackdrop.addEventListener("click", closeSolanaWalletModal);

  if (connectPhantomBtn) {
    connectPhantomBtn.addEventListener("click", () => {
      connectSolanaProvider(
        "Phantom",
        () => window.phantom?.solana || (window.solana?.isPhantom ? window.solana : null),
        "https://phantom.app"
      );
    });
  }

  if (connectSolflareBtn) {
    connectSolflareBtn.addEventListener("click", () => {
      connectSolanaProvider(
        "Solflare",
        () => window.solflare || (window.solana?.isSolflare ? window.solana : null),
        "https://solflare.com"
      );
    });
  }

  if (connectBackpackBtn) {
    connectBackpackBtn.addEventListener("click", () => {
      connectSolanaProvider(
        "Backpack",
        () => window.backpack || (window.solana?.isBackpack ? window.solana : null),
        "https://backpack.app"
      );
    });
  }

  if (solana1ClickDemoBtn) {
    solana1ClickDemoBtn.addEventListener("click", handleSolana1ClickDemo);
  }

  if (solanaOrgInput && activeSolanaOrgLabel) {
    solanaOrgInput.addEventListener("input", () => {
      activeSolanaOrgLabel.textContent = solanaOrgInput.value.trim() || "nodus-devs";
    });
  }

  if (switchAccountBtn) {
    switchAccountBtn.addEventListener("click", () => {
      closeVaultModal();
      openZkLoginModal();
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener("click", signOut);
  }

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener("click", () => {
      if (state.currentUser?.address) {
        navigator.clipboard.writeText(state.currentUser.address);
        showToast(t("toast_copied"), "info");
      }
    });
  }

  if (copyOrgPdaBtn) {
    copyOrgPdaBtn.addEventListener("click", () => {
      const orgPda = modalOrgPda?.textContent;
      if (orgPda && orgPda !== "--") {
        navigator.clipboard.writeText(orgPda);
        showToast(t("toast_copied"), "info");
      }
    });
  }

  if (exportVaultsBtn) {
    exportVaultsBtn.addEventListener("click", () => {
      const backupData = {
        exported_at: new Date().toISOString(),
        application: "Nodus Sovereign Cloud",
        current_user: state.currentUser,
        session_active: Boolean(state.currentUser)
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nodus-session-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Session backup exported to JSON", "success");
    });
  }

  // ==========================================
  // API INTERACTIONS & STATUS
  // ==========================================
  async function fetchStatus() {
    try {
      const res = await apiFetch("/api/status");
      const data = await res.json();
      if (data.success) {
        state.status = data;
        const used = data.space?.storage_used_bytes || 0;
        const cap = data.space?.storage_cap_bytes || 5000000000;
        const percent = Math.min(100, Math.max(0, (used / cap) * 100));
        if (quotaValue) quotaValue.textContent = `${formatBytes(used)} / ${formatBytes(cap)}`;
        if (quotaFill) quotaFill.style.width = `${percent}%`;
        updateDemoEvidence();
      }
    } catch (err) {
      console.warn("fetchStatus offline or degraded:", err);
    }
  }

  function updateDemoEvidence() {
    const deployment = state.status?.deployment;
    const environment = deployment?.environment || "local";
    const isTestnet = deployment?.direct_walrus_testnet_enabled === true;
    if (demoEnvironmentLabel) {
      demoEnvironmentLabel.textContent = `${environment} · Walrus Testnet ${isTestnet ? "enabled" : "not configured"}`;
    }

    const organizationId = activeTenantId();
    if (demoOrganizationValue) demoOrganizationValue.textContent = organizationId || "Sign in required";
    if (demoRoleValue) demoRoleValue.textContent = state.currentUser?.role || "Not verified";

    const proof = state.currentUser?.solanaProof;
    if (demoSolanaProofLink) {
      if (proof?.memberPda) {
        demoSolanaProofLink.href = `https://explorer.solana.com/address/${encodeURIComponent(proof.memberPda)}?cluster=devnet`;
        demoSolanaProofLink.classList.remove("hidden");
      } else {
        demoSolanaProofLink.href = "#";
        demoSolanaProofLink.classList.add("hidden");
      }
    }
    if (demoEvidenceNote) {
      demoEvidenceNote.textContent = proof?.memberPda
        ? "RBAC was checked against the active Devnet member PDA. Revoked members cannot obtain a new key envelope."
        : "Sign in with a provisioned Solana member to display the live Devnet PDA proof.";
    }
  }

  async function fetchPhotos() {
    photoCounter.textContent = t("loading_vault");
    if (state.photos.length === 0 && photoGrid) {
      photoGrid.innerHTML = `
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
      `;
    }
    try {
      const res = await apiFetch("/api/photos");
      const data = await res.json();
      if (data.success) {
        state.photos = data.photos || [];
        updateTagChips();
        renderPhotos();
      } else {
        photoCounter.textContent = t("sync_failed");
        renderPhotos();
      }
    } catch (err) {
      photoCounter.textContent = t("conn_error");
      renderPhotos();
    }
  }

  // Multi-type asset classifier
  function getAssetCategory(photo) {
    const filename = (photo.original_name || photo.name || "").toLowerCase();
    const ext = filename.split(".").pop();
    const mime = (photo.original_type || photo.content_type || "").toLowerCase();

    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext) || mime.startsWith("image/")) {
      return { category: "image", icon: "image", label: "Image" };
    }
    if (ext === "pdf" || mime === "application/pdf") {
      return { category: "document", icon: "file-text", label: "PDF" };
    }
    if (["docx", "doc", "txt", "md", "json", "csv"].includes(ext) || mime.startsWith("text/") || mime.includes("document")) {
      return { category: "document", icon: "file-text", label: "Document" };
    }
    if (["mp4", "webm", "mov"].includes(ext) || mime.startsWith("video/")) {
      return { category: "media", icon: "video", label: "Video" };
    }
    if (["mp3", "wav", "ogg"].includes(ext) || mime.startsWith("audio/")) {
      return { category: "media", icon: "music", label: "Audio" };
    }
    if (["zip", "tar", "gz", "7z", "rar"].includes(ext) || mime.includes("zip") || mime.includes("tar")) {
      return { category: "archive", icon: "archive", label: "Archive" };
    }
    return { category: "other", icon: "file", label: ext ? ext.toUpperCase() : "File" };
  }

  // Dynamic Category & Tag Chips
  function updateTagChips() {
    const categories = [
      { id: "all", label: "All" },
      { id: "images", label: "Images" },
      { id: "documents", label: "Documents" },
      { id: "media", label: "Media" },
      { id: "archives", label: "Archives" }
    ];

    const customTags = new Set();
    state.photos.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => {
          if (!["photo", "nodus", "all", "image", "images"].includes(t.toLowerCase())) {
            customTags.add(t.toLowerCase());
          }
        });
      }
    });

    const categoryChips = categories.map((cat) => {
      const isActive = state.selectedTag === cat.id;
      return `<button class="tag-chip ${isActive ? "active" : ""}" data-tag="${cat.id}">${cat.label}</button>`;
    });

    const tagChipsList = Array.from(customTags).slice(0, 6).map((tag) => {
      const isActive = state.selectedTag === tag;
      const safeTag = escapeHtml(tag);
      return `<button class="tag-chip ${isActive ? "active" : ""}" data-tag="${safeTag}">#${safeTag}</button>`;
    });

    tagChips.innerHTML = [...categoryChips, ...tagChipsList].join("");

    tagChips.querySelectorAll(".tag-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.selectedTag = chip.getAttribute("data-tag");
        tagChips.querySelectorAll(".tag-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderPhotos();
      });
    });
  }

  // Render Asset Grid with Zero-Knowledge Search & Multi-Type Icons
  function renderPhotos() {
    const query = state.searchQuery.toLowerCase().trim();
    const queryTokens = query.split(/\s+/).filter(Boolean);

    let filtered = state.photos.filter((p) => {
      const cat = getAssetCategory(p);
      const name = (p.original_name || p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const tags = (p.tags || []).map((t) => t.toLowerCase());
      const ext = name.split(".").pop();

      // Zero-Knowledge Private Search matching
      let matchesQuery = true;
      if (queryTokens.length > 0) {
        matchesQuery = queryTokens.every((tok) =>
          name.includes(tok) ||
          desc.includes(tok) ||
          tags.some((t) => t.includes(tok)) ||
          cat.label.toLowerCase().includes(tok) ||
          cat.category.toLowerCase().includes(tok) ||
          (p.blob_id && p.blob_id.toLowerCase().includes(tok)) ||
          (p.id && p.id.toLowerCase().includes(tok))
        );
      }

      // Tag & Category filter
      let matchesTag = true;
      if (state.selectedTag && state.selectedTag !== "all") {
        if (state.selectedTag === "images") matchesTag = cat.category === "image";
        else if (state.selectedTag === "documents") matchesTag = cat.category === "document";
        else if (state.selectedTag === "media") matchesTag = cat.category === "media";
        else if (state.selectedTag === "archives") matchesTag = cat.category === "archive";
        else matchesTag = tags.includes(state.selectedTag.toLowerCase()) || ext === state.selectedTag.toLowerCase();
      }

      return matchesQuery && matchesTag;
    });

    // Sort
    if (state.sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (state.sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (state.sortBy === "name") {
      filtered.sort((a, b) => (a.original_name || a.name).localeCompare(b.original_name || b.name));
    } else if (state.sortBy === "size") {
      filtered.sort((a, b) => (b.size || 0) - (a.size || 0));
    }

    const count = state.photos.length;
    const word = count === 1 ? t("word_single") : t("word_plural");
    photoCounter.textContent = t("photo_counter", { count, word });

    const hasUploads = state.activeUploads && state.activeUploads.length > 0;

    if (filtered.length === 0 && !hasUploads) {
      photoGrid.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    const uploadCardsHtml = (state.activeUploads || [])
      .map((task) => {
        let stageText = t("optimistic_encrypting");
        let stageIcon = "lock";
        if (task.stage === 2) {
          stageText = t("optimistic_uploading");
          stageIcon = "cloud-upload";
        } else if (task.stage === 3) {
          stageText = t("optimistic_anchored");
          stageIcon = "check-circle-2";
        } else if (task.failed) {
          stageText = t("optimistic_failed");
          stageIcon = "alert-circle";
        }

        const safeTaskName = escapeHtml(task.name);
        return `
        <div class="photo-card uploading" id="card-${task.id}">
          <img class="photo-thumbnail" src="${task.previewUrl}" alt="${safeTaskName}">
          <div class="uploading-overlay">
            <div class="uploading-top-badge">
              <i data-lucide="${stageIcon}" style="width: 12px; height: 12px;"></i>
              <span id="badge-text-${task.id}">${stageText}</span>
            </div>
            <div class="uploading-center">
              <div class="uploading-spinner-ring">
                <i data-lucide="shield" style="width: 16px; height: 16px;"></i>
              </div>
              <span class="uploading-status-label" id="status-text-${task.id}">Walrus Cryptographic Vault</span>
            </div>
            <div class="uploading-bottom">
              <span class="uploading-filename">${safeTaskName}</span>
              <div class="uploading-progress-track">
                <div class="uploading-progress-bar" id="bar-${task.id}" style="width: ${task.progress || 25}%;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    const photoCardsHtml = filtered
      .map((p) => {
        const cat = getAssetCategory(p);
        const isImage = cat.category === "image";
        const isSelected = state.selectedIds.has(p.id);
        const cachedUrl = decryptedMediaCache.get(p.id);
        const initialSrc = cachedUrl || (p.encrypted ? "" : p.stream_url);
        const safeName = escapeHtml(p.original_name || p.name);
        const safeId = escapeHtml(p.id);

        const thumbnailHtml = isImage
          ? `<img class="photo-thumbnail" id="thumb-${safeId}" src="${initialSrc || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' fill=\'%231a2332\'><rect width=\'100\' height=\'100\'/><text x=\'50%\' y=\'50%\' fill=\'%238b949e\' font-size=\'11\' text-anchor=\'middle\' dy=\'.3em\'>🔒 Encrypted</text></svg>'}" alt="${safeName}" loading="lazy">`
          : `<div class="photo-thumbnail doc-card-thumb" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background: radial-gradient(circle at 50% 30%, #1e293b, #0f172a); width:100%; height:100%; position:relative;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(56, 139, 253, 0.12); border: 1px solid rgba(56, 139, 253, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                <i data-lucide="${cat.icon}" style="width: 24px; height: 24px; color: #58a6ff;"></i>
              </div>
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #8b949e; background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 6px;">${cat.label}</span>
            </div>`;

        return `
        <div class="photo-card ${isSelected ? "selected" : ""}" data-id="${safeId}">
          <div class="photo-select-checkbox" data-select-id="${safeId}">
            <i data-lucide="${isSelected ? "check" : ""}" style="width: 14px; height: 14px;"></i>
          </div>
          ${thumbnailHtml}
          <div class="photo-overlay">
            <div class="overlay-top">
              <span class="badge-seal"><i data-lucide="lock" style="width: 10px; height: 10px;"></i> Seal</span>
            </div>
            <div class="overlay-bottom">
              <span class="photo-card-name">${safeName}</span>
              <span class="photo-card-meta">${formatBytes(p.size)} • ${formatDate(p.created_at)}</span>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    photoGrid.innerHTML = uploadCardsHtml + photoCardsHtml;

    // Asynchronously decrypt and stream thumbnails on-device only for images
    filtered.forEach((p) => {
      const cat = getAssetCategory(p);
      if (cat.category === "image" && p.encrypted && p.iv && !decryptedMediaCache.has(p.id)) {
        getOrDecryptPhotoUrl(p).then((url) => {
          const imgEl = document.getElementById(`thumb-${p.id}`);
          if (imgEl && url) imgEl.src = url;
        });
      }
    });

    if (window.lucide) window.lucide.createIcons();

    // Attach click handlers only to non-uploading photo cards
    photoGrid.querySelectorAll(".photo-card:not(.uploading)").forEach((card) => {
      const id = card.getAttribute("data-id");

      // Checkbox click
      const checkbox = card.querySelector(".photo-select-checkbox");
      checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePhotoSelection(id);
      });

      // Card click
      card.addEventListener("click", () => {
        if (state.selectMode) {
          togglePhotoSelection(id);
        } else {
          const photo = state.photos.find((p) => p.id === id);
          if (photo) openLightbox(photo);
        }
      });
    });

    updateBatchBar();
  }

  // Selection Logic
  function togglePhotoSelection(id) {
    if (state.selectedIds.has(id)) {
      state.selectedIds.delete(id);
    } else {
      state.selectedIds.add(id);
    }
    updateBatchBar();
    renderPhotos();
  }

  function updateBatchBar() {
    const count = state.selectedIds.size;
    if (count > 0) {
      batchBar.classList.remove("hidden");
      batchCount.textContent = `${count} ${count === 1 ? "photo" : "photos"} selected`;
    } else {
      batchBar.classList.add("hidden");
      if (state.selectMode) {
        // stay in select mode
      }
    }
  }

  toggleSelectModeBtn.addEventListener("click", () => {
    state.selectMode = !state.selectMode;
    document.body.classList.toggle("select-mode", state.selectMode);
    toggleSelectModeBtn.querySelector("span").textContent = state.selectMode ? t("cancel_select") : t("select_btn");
    if (!state.selectMode) {
      state.selectedIds.clear();
      updateBatchBar();
      renderPhotos();
    }
  });

  batchDeselectBtn.addEventListener("click", () => {
    state.selectedIds.clear();
    updateBatchBar();
    renderPhotos();
  });

  batchDeleteBtn.addEventListener("click", async () => {
    const count = state.selectedIds.size;
    if (count === 0) return;
    const confirmDelete = confirm(t("batch_confirm", { count }));
    if (!confirmDelete) return;

    batchDeleteBtn.disabled = true;
    batchDeleteBtn.innerHTML = `<div class="spinner-sm"></div> ${t("batch_deleting", { count })}`;

    try {
      const res = await apiFetch("/api/photos/batch-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileIds: Array.from(state.selectedIds) })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Deleted ${data.deleted_count} photos from Walrus`, "success");
        state.selectedIds.clear();
        await fetchPhotos();
        await fetchStatus();
      } else {
        showToast("Batch delete failed: " + data.error, "danger");
      }
    } catch (err) {
      showToast("Error: " + err.message, "danger");
    } finally {
      batchDeleteBtn.disabled = false;
      batchDeleteBtn.innerHTML = `<i data-lucide="trash-2"></i> <span>${t("delete_selected")}</span>`;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderPhotos();
  });

  // ==========================================
  // LIGHTBOX & METADATA EDITING
  // ==========================================
  async function openLightbox(photo) {
    state.selectedPhoto = photo;
    if (lightboxViewport) lightboxViewport.classList.remove("zoomed");
    if (lightboxZoomBtn) {
      lightboxZoomBtn.innerHTML = '<i data-lucide="maximize-2"></i>';
    }

    const techDrawer = document.querySelector(".tech-drawer");
    if (techDrawer) techDrawer.open = false;

    sidebarFileName.textContent = photo.original_name || photo.name;
    sidebarMimeBadge.textContent = photo.original_type || photo.content_type || "image/jpeg";
    metaBlobId.textContent = photo.blob_id || t("anchored_walrus");
    metaFileId.textContent = photo.id || "--";
    if (sidebarCurrentRole) sidebarCurrentRole.textContent = state.currentUser?.role || "Não verificado";
    if (sidebarSolanaProofLink) {
      const memberPda = state.currentUser?.solanaProof?.memberPda;
      sidebarSolanaProofLink.href = memberPda ? `https://explorer.solana.com/address/${encodeURIComponent(memberPda)}?cluster=devnet` : "#";
      sidebarSolanaProofLink.classList.toggle("hidden", !memberPda);
    }
    const policyId = state.status?.bucket?.seal_policy_id || "0x9c1baccb244e45342ac150a0123a4802e8e834f25c00210e50c81081354eee44";
    metaSealPolicy.textContent = policyId;

    const walruscanLink = document.getElementById("walruscanLink");
    if (walruscanLink) {
      if (photo.blob_id) {
        walruscanLink.href = `https://walruscan.com/testnet/blob/${photo.blob_id}`;
        walruscanLink.style.display = "inline-flex";
      } else {
        walruscanLink.style.display = "none";
      }
    }

    const suivisionPolicyLink = document.getElementById("suivisionPolicyLink");
    if (suivisionPolicyLink) {
      suivisionPolicyLink.href = `https://suivision.xyz/object/${policyId}`;
    }
    const suiscanPolicyLink = document.getElementById("suiscanPolicyLink");
    if (suiscanPolicyLink) {
      suiscanPolicyLink.href = `https://suiscan.xyz/mainnet/object/${policyId}`;
    }

    metaFileSize.textContent = formatBytes(photo.original_size || photo.size);
    metaUploadDate.textContent = formatDate(photo.created_at);

    const cat = getAssetCategory(photo);

    if (photo.encrypted && !assetKeyCache.has(photo.id)) {
      try {
        await recoverAssetKey(photo.id);
      } catch (error) {
        showToast(`Unable to unlock ${photo.original_name || photo.name}: ${error.message}`, "danger");
      }
    }

    function displayLightboxMedia(url, currentCat) {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.classList.add("hidden");
        lightboxVideo.src = "";
      }
      if (lightboxAudio) {
        lightboxAudio.pause();
        lightboxAudio.classList.add("hidden");
        lightboxAudio.src = "";
      }
      lightboxImg.classList.add("hidden");

      const mime = (photo.original_type || photo.content_type || "").toLowerCase();
      const ext = (photo.original_name || photo.name || "").split(".").pop().toLowerCase();

      if (currentCat.category === "image") {
        lightboxImg.src = url;
        lightboxImg.classList.remove("hidden");
      } else if (currentCat.label === "Video" || mime.startsWith("video/") || ["mp4", "webm", "mov"].includes(ext)) {
        if (lightboxVideo) {
          lightboxVideo.src = url;
          lightboxVideo.classList.remove("hidden");
        }
      } else if (currentCat.label === "Audio" || mime.startsWith("audio/") || ["mp3", "wav", "ogg"].includes(ext)) {
        if (lightboxAudio) {
          lightboxAudio.src = url;
          lightboxAudio.classList.remove("hidden");
        }
      } else {
        lightboxImg.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="350" fill="%230f172a"><rect width="500" height="350" rx="16"/><circle cx="250" cy="140" r="44" fill="%231e293b" stroke="%23388bfd" stroke-width="2"/><text x="50%" y="150" fill="%2358a6ff" font-size="26" font-family="sans-serif" text-anchor="middle">📄</text><text x="50%" y="220" fill="%23f0f6fc" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">${encodeURIComponent(currentCat.label)}</text><text x="50%" y="246" fill="%238b949e" font-size="13" font-family="sans-serif" text-anchor="middle">Decrypted on-device with WebCrypto</text></svg>`;
        lightboxImg.classList.remove("hidden");
      }
    }

    if (photo.encrypted && assetKeyCache.has(photo.id) && photo.iv) {
      if (decryptedMediaCache.has(photo.id)) {
        const decryptedUrl = decryptedMediaCache.get(photo.id);
        displayLightboxMedia(decryptedUrl, cat);
        downloadBtn.href = decryptedUrl;
        downloadBtn.setAttribute("download", photo.original_name || photo.name);
      } else {
        lightboxImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23131b26"><rect width="400" height="300"/><text x="50%" y="50%" fill="%2358a6ff" font-size="14" text-anchor="middle" dy=".3em">🔒 Decrypting on-device with WebCrypto...</text></svg>';
        lightboxImg.classList.remove("hidden");
        downloadBtn.href = "#";
        downloadBtn.removeAttribute("download");
        getOrDecryptPhotoUrl(photo).then((decryptedUrl) => {
          if (state.selectedPhoto && state.selectedPhoto.id === photo.id) {
            displayLightboxMedia(decryptedUrl, cat);
            downloadBtn.href = decryptedUrl;
            downloadBtn.setAttribute("download", photo.original_name || photo.name);
          }
        }).catch((err) => {
          console.error("Lightbox decryption error:", err);
          displayLightboxMedia(photo.stream_url, cat);
          downloadBtn.href = photo.download_url;
        });
      }
    } else {
      displayLightboxMedia(photo.stream_url, cat);
      downloadBtn.href = photo.download_url;
      downloadBtn.setAttribute("download", photo.name);
    }

    lightboxModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (window.lucide) window.lucide.createIcons();
  }

  function closeLightbox() {
    lightboxModal.classList.add("hidden");
    if (lightboxViewport) lightboxViewport.classList.remove("zoomed");
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = "";
      lightboxVideo.classList.add("hidden");
    }
    if (lightboxAudio) {
      lightboxAudio.pause();
      lightboxAudio.src = "";
      lightboxAudio.classList.add("hidden");
    }
    document.body.style.overflow = "";
    state.selectedPhoto = null;
  }

  function navigateLightbox(direction) {
    if (!state.selectedPhoto || !state.photos || state.photos.length === 0) return;
    const currentIndex = state.photos.findIndex((p) => p.id === state.selectedPhoto.id);
    if (currentIndex === -1) return;
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = state.photos.length - 1;
    if (nextIndex >= state.photos.length) nextIndex = 0;
    openLightbox(state.photos[nextIndex]);
  }

  function toggleLightboxZoom() {
    if (!lightboxViewport) return;
    lightboxViewport.classList.toggle("zoomed");
    const isZoomed = lightboxViewport.classList.contains("zoomed");
    if (lightboxZoomBtn) {
      lightboxZoomBtn.innerHTML = isZoomed
        ? '<i data-lucide="minimize-2"></i>'
        : '<i data-lucide="maximize-2"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  if (lightboxZoomBtn) {
    lightboxZoomBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLightboxZoom();
    });
  }

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  // Mobile Touch Gestures for Smooth Lightbox Browsing
  let touchStartX = 0;
  let touchStartY = 0;
  if (lightboxViewport) {
    lightboxViewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightboxViewport.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          navigateLightbox(1); // Swipe left -> Next photo
        } else {
          navigateLightbox(-1); // Swipe right -> Previous photo
        }
      }
    }, { passive: true });
  }

  document.addEventListener("keydown", (e) => {
    // If user is focused on an input/textarea, ignore shortcut navigation
    if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      if (e.key === "Escape") {
        document.activeElement.blur();
      }
      return;
    }

    if (e.key === "Escape") {
      if (!editModal.classList.contains("hidden")) closeEditModal();
      else if (!vaultModal.classList.contains("hidden")) closeVaultModal();
      else if (!lightboxModal.classList.contains("hidden")) closeLightbox();
    } else if (!lightboxModal.classList.contains("hidden")) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateLightbox(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateLightbox(1);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteBtn.click();
      }
    }
  });

  // Edit Metadata Modal Handlers
  editMetaBtn.addEventListener("click", () => {
    if (!state.selectedPhoto) return;
    editFileNameInput.value = state.selectedPhoto.name;
    editDescriptionInput.value = "";
    editTagsInput.value = "photo, nodus";
    editModal.classList.remove("hidden");
  });

  function closeEditModal() {
    editModal.classList.add("hidden");
  }
  editModalClose.addEventListener("click", closeEditModal);
  editModalBackdrop.addEventListener("click", closeEditModal);
  editCancelBtn.addEventListener("click", closeEditModal);

  // Share Modal Handlers
  let shareRecipients = [];

  function setShareStatus(message = "", type = "") {
    if (!shareFlowStatus) return;
    shareFlowStatus.textContent = message;
    shareFlowStatus.className = `share-flow-status${type ? ` is-${type}` : ""}`;
  }

  async function shareResponse(response, fallback) {
    const body = await response.json().catch(() => ({}));
    if (response.ok && body.success) return body;
    if (response.status === 401) throw new Error("A sessão expirou. Entre novamente com a carteira provisionada.");
    if (response.status === 403) throw new Error("Esta carteira não tem permissão para gerenciar este arquivo.");
    if (response.status >= 500) throw new Error("O serviço está indisponível. Aguarde alguns segundos e tente novamente.");
    throw new Error(body.error || fallback);
  }

  async function loadAssetShares(assetId) {
    setShareStatus("Carregando acessos atuais…", "loading");
    const response = await apiFetch(`/api/assets/${encodeURIComponent(assetId)}/shares`);
    const body = await shareResponse(response, "Não foi possível carregar os acessos atuais.");
    const proofs = new Map();
    await Promise.all((body.shares || []).filter((share) => share.status === "active").map(async (share) => {
      try {
        const proofResponse = await apiFetch(`/api/solana/devnet/proof?organizationId=${encodeURIComponent(activeTenantId())}&address=${encodeURIComponent(share.recipientAddress)}`);
        const proof = await proofResponse.json();
        if (proofResponse.ok && proof.success) proofs.set(share.recipientAddress, proof);
      } catch { /* Local/sandbox mode does not expose a Devnet proof. */ }
    }));
    const statusLabels = { active: "ativo", revoked: "revogado", expired: "expirado" };
    shareAccessList.innerHTML = body.shares.length ? `<strong>Acessos do arquivo</strong>${body.shares.map((share) => {
      const proof = proofs.get(share.recipientAddress);
      const explorer = proof?.memberPda ? ` <a class="copy-btn" href="https://explorer.solana.com/address/${encodeURIComponent(proof.memberPda)}?cluster=devnet" target="_blank" rel="noopener noreferrer" title="View active Devnet member PDA">☀</a>` : "";
      return `<div class="share-access-entry"><span class="share-access-entry-main"><strong>${escapeHtml(shortenAddress(share.recipientAddress))}</strong><small>viewer · ${escapeHtml(statusLabels[share.status] || share.status)}</small></span><span>${explorer}${share.status === "active" ? `<button class="copy-btn" data-revoke-share="${escapeHtml(share.id)}" title="Revogar acesso futuro"><i data-lucide="ban"></i></button>` : ""}</span></div>`;
    }).join("")}` : "<span class=\"form-help\">Nenhum acesso foi concedido para este arquivo.</span>";
    shareAccessList.querySelectorAll("[data-revoke-share]").forEach((button) => button.addEventListener("click", async () => {
      button.disabled = true;
      setShareStatus("Revogando acesso futuro…", "loading");
      try {
        const revoke = await apiFetch(`/api/assets/${encodeURIComponent(assetId)}/shares/${encodeURIComponent(button.dataset.revokeShare)}`, { method: "DELETE" });
        await shareResponse(revoke, "Não foi possível revogar o acesso.");
        const message = "O acesso futuro foi bloqueado. Cópias já baixadas não podem ser apagadas.";
        showToast(message, "success");
        await loadAssetShares(assetId);
        setShareStatus(message, "success");
        if (window.lucide) window.lucide.createIcons();
      } catch (error) {
        setShareStatus(error.message, "error");
        showToast(error.message, "danger");
        button.disabled = false;
      }
    }));
    setShareStatus();
    if (window.lucide) window.lucide.createIcons();
  }

  async function openShareModal() {
    if (!state.selectedPhoto) return;
    if (!state.currentUser?.accessToken) return showToast("Entre com uma carteira provisionada para compartilhar acesso cifrado.", "warning");
    try {
      setShareStatus("Carregando membros elegíveis…", "loading");
      const recipientResponse = await apiFetch(`/api/orgs/${encodeURIComponent(activeTenantId())}/key-recipients`);
      const recipients = await shareResponse(recipientResponse, "Não foi possível carregar os membros da organização.");
      shareRecipients = (recipients.recipients || []).filter((item) => item.member !== state.currentUser.address && item.identity?.publicKey);
      shareRecipientSelect.innerHTML = shareRecipients.length ? shareRecipients.map((item) => `<option value="${escapeHtml(item.member)}">${escapeHtml(shortenAddress(item.member))} · ${escapeHtml(item.role)}</option>`).join("") : "<option value=\"\">Nenhum membro elegível</option>";
      if (shareSelectedAsset) shareSelectedAsset.textContent = state.selectedPhoto.original_name || state.selectedPhoto.name;
      shareModal.classList.remove("hidden");
      await loadAssetShares(state.selectedPhoto.id);
      if (window.lucide) window.lucide.createIcons();
    } catch (error) {
      setShareStatus(error.message, "error");
      showToast(error.message, "danger");
    }
  }

  function closeShareModal() {
    if (shareModal) shareModal.classList.add("hidden");
  }

  if (shareBtn) shareBtn.addEventListener("click", openShareModal);
  if (shareModalClose) shareModalClose.addEventListener("click", closeShareModal);
  if (shareCloseBtn) shareCloseBtn.addEventListener("click", closeShareModal);
  const shareModalBackdrop = document.getElementById("shareModalBackdrop");
  if (shareModalBackdrop) shareModalBackdrop.addEventListener("click", closeShareModal);

  if (grantShareBtn) grantShareBtn.addEventListener("click", async () => {
    const recipient = shareRecipients.find((item) => item.member === shareRecipientSelect.value);
    if (!recipient || !state.selectedPhoto) return showToast("Escolha um membro elegível da organização.", "warning");
    grantShareBtn.disabled = true;
    setShareStatus("Cifrando um envelope exclusivo para o Member…", "loading");
    try {
      const photo = state.selectedPhoto;
      const key = assetKeyCache.get(photo.id) || await recoverAssetKey(photo.id);
      const envelope = await wrapDataKeyForRecipient(photo.id, key, recipient.member, recipient.identity.publicKey);
      const response = await apiFetch(`/api/assets/${encodeURIComponent(photo.id)}/shares`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recipientAddress: recipient.member, role: "viewer", expiresAt: null, envelopes: [envelope] }) });
      await shareResponse(response, `Não foi possível compartilhar ${photo.name}.`);
      const message = `Acesso cifrado concedido a ${shortenAddress(recipient.member)}.`;
      showToast(message, "success");
      await loadAssetShares(photo.id);
      setShareStatus(message, "success");
    } catch (error) {
      setShareStatus(error.message, "error");
      showToast(error.message, "danger");
    } finally { grantShareBtn.disabled = false; }
  });

  // Instant 1-Click Demo Login
  if (instantDemoBtn) {
    instantDemoBtn.addEventListener("click", async () => {
      showToast("⚡ Initializing 1-Click Sovereign Demo Session...", "info");
      try {
        const res = await fetch("/api/auth/solana/demo", { method: "POST" });
        const data = await res.json();
        if (data.success && data.address) {
          const session = {
            id: `demo_${Date.now()}`,
            method: "demo",
            provider: "Ephemeral Solana Vault",
            name: "Demo Architect",
            email: shortenAddress(data.address),
            address: data.address,
            scheme: "ED25519 (SIWS)",
            organizations: data.organizations || [],
            activeOrg: data.activeOrg || { orgId: "nodus-devs" },
            accessToken: data.accessToken || null,
            expiresAt: data.expiresAt || null,
            tenant: data.tenant || { organizationId: "nodus-devs" },
            role: data.role || "owner",
            solanaProof: data.solanaProof || null,
            createdAt: new Date().toISOString()
          };
          saveAuthSession(session);
          if (data.accessToken) {
            try { await ensureDeviceIdentity(); } catch (e) { console.warn("Device identity warning:", e); }
          }
          showToast("🚀 Logged in as Demo Architect! Ready to explore and upload.", "success");
          await fetchStatus();
          await fetchPhotos();
          return;
        }
      } catch (err) {
        console.warn("Demo endpoint failed, using on-device guest passkey:", err);
      }
      handleGuestPasskey();
    });
  }

  editSaveBtn.addEventListener("click", async () => {
    if (!state.selectedPhoto) return;
    const fileId = state.selectedPhoto.id;
    const newName = editFileNameInput.value.trim();
    const newDesc = editDescriptionInput.value.trim();
    const newTags = editTagsInput.value.split(",").map((s) => s.trim()).filter(Boolean);

    if (!newName) return;

    editSaveBtn.disabled = true;
    editSaveBtn.innerHTML = `<div class="spinner-sm"></div> ${t("saving")}`;

    try {
      const res = await apiFetch(`/api/photos/${fileId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, description: newDesc, tags: newTags })
      });
      const data = await res.json();

      if (data.success) {
        state.selectedPhoto.name = newName;
        sidebarFileName.textContent = newName;
        closeEditModal();
        showToast(t("toast_updated"), "success");
        await fetchPhotos();
      } else {
        showToast("Update failed: " + data.error, "danger");
      }
    } catch (err) {
      showToast("Error updating: " + err.message, "danger");
    } finally {
      editSaveBtn.disabled = false;
      editSaveBtn.innerHTML = t("save_changes");
    }
  });

  // Single Delete
  deleteBtn.addEventListener("click", async () => {
    if (!state.selectedPhoto) return;
    const confirmDelete = confirm(t("delete_confirm", { name: state.selectedPhoto.name }));
    if (!confirmDelete) return;

    const fileId = state.selectedPhoto.id;
    deleteBtn.disabled = true;
    deleteBtn.innerHTML = `<div class="spinner-sm"></div> ${t("deleting")}`;

    try {
      const res = await apiFetch(`/api/photos/${fileId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        closeLightbox();
        showToast(t("toast_deleted"), "success");
        await fetchPhotos();
        await fetchStatus();
      } else {
        showToast("Delete failed: " + data.error, "danger");
      }
    } catch (err) {
      showToast("Delete failed: " + err.message, "danger");
    } finally {
      deleteBtn.disabled = false;
      deleteBtn.innerHTML = `<i data-lucide="trash-2"></i> ${t("delete_btn")}`;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Copy helper
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute("data-copy");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent.trim());
        showToast(t("toast_copied"), "info");
      }
    });
  });

  // ==========================================
  // NON-BLOCKING BACKGROUND UPLOAD PIPELINE
  // ==========================================
  let isUploadingQueue = false;
  let lastUploadedBlobId = null;
  const uploadQueue = [];
  const RESUMABLE_THRESHOLD_BYTES = 20 * 1024 * 1024;
  const RESUMABLE_CHUNK_SIZE = 8 * 1024 * 1024;

  function updateOptimisticCard(taskId, stage, progress, labelText) {
    const badgeText = document.getElementById(`badge-text-${taskId}`);
    const bar = document.getElementById(`bar-${taskId}`);
    if (badgeText && labelText) badgeText.textContent = labelText;
    if (bar && progress !== undefined) bar.style.width = `${progress}%`;
  }

  async function uploadResumableEncryptedAsset(file, onProgress) {
    const key = await NodusCrypto.generateDataKey();
    const keyHex = await NodusCrypto.exportKeyHex(key);
    const baseIv = window.crypto.getRandomValues(new Uint8Array(12));
    const ivHex = Array.from(baseIv).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    const chunkCount = Math.ceil(file.size / RESUMABLE_CHUNK_SIZE);
    const encryptedSize = file.size + (chunkCount * 16);

    const createRes = await apiFetch("/api/assets/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originalName: file.name,
        originalType: file.type || "application/octet-stream",
        originalSize: file.size,
        encryptedSize,
        partSize: RESUMABLE_CHUNK_SIZE + 16,
        description: `Zero-Knowledge resumable asset uploaded to Walrus at ${new Date().toISOString()}`,
        tags: ["nodus", "resumable"],
        encryption: {
          mode: "chunked-aes-gcm-v1",
          iv: ivHex,
          chunkSize: RESUMABLE_CHUNK_SIZE,
          chunkCount,
          originalName: file.name,
          originalType: file.type || "application/octet-stream",
          originalSize: file.size
        }
      })
    });
    const createData = await createRes.json();
    if (!createRes.ok || !createData.success) throw new Error(createData.error || "Could not create resumable upload");

    const { uploadId } = createData.upload;
    try {
      for (let partNumber = 0; partNumber < chunkCount; partNumber++) {
        const start = partNumber * RESUMABLE_CHUNK_SIZE;
        const end = Math.min(start + RESUMABLE_CHUNK_SIZE, file.size);
        const plaintext = await file.slice(start, end).arrayBuffer();
        const ciphertext = await NodusCrypto.encryptChunk(plaintext, key, ivHex, partNumber);
        const checksum = await NodusCrypto.sha256Hex(ciphertext);
        let partUploaded = false;
        let partAttempts = 0;
        let lastPartErr = null;
        while (!partUploaded && partAttempts < 3) {
          partAttempts++;
          try {
            const partRes = await apiFetch(`/api/assets/uploads/${uploadId}/parts/${partNumber}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/octet-stream",
                "x-part-sha256": checksum
              },
              body: ciphertext
            });
            const partData = await partRes.json();
            if (partRes.ok && partData.success) {
              partUploaded = true;
            } else {
              throw new Error(partData.error || `Part ${partNumber + 1} rejected`);
            }
          } catch (partErr) {
            lastPartErr = partErr;
            if (partAttempts < 3) {
              await new Promise((r) => setTimeout(r, 600 * partAttempts));
            }
          }
        }
        if (!partUploaded) {
          throw new Error(lastPartErr?.message || `Failed to upload part ${partNumber + 1}`);
        }
        onProgress?.({ uploadedBytes: end, totalBytes: file.size, partNumber, chunkCount });
      }

      const completeRes = await apiFetch(`/api/assets/uploads/${uploadId}/complete`, { method: "POST" });
      const completeData = await completeRes.json();
      if (!completeRes.ok || !completeData.success) throw new Error(completeData.error || "Could not complete resumable upload");
      return { ...completeData, clientKey: keyHex };
    } catch (error) {
      error.uploadId = uploadId;
      throw error;
    }
  }

  async function handleFilesUpload(files) {
    if (!requireAuth()) return;
    if (!files || files.length === 0) return;

    const dockOnchainProof = document.getElementById("dockOnchainProof");
    if (dockOnchainProof) dockOnchainProof.classList.add("hidden");

    const fileList = Array.from(files);
    fileInput.value = "";

    // Create tasks for each file
    for (const file of fileList) {
      const previewUrl = URL.createObjectURL(file);
      const task = {
        id: "task_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        file,
        name: file.name,
        size: file.size,
        previewUrl,
        stage: 1, // 1: Seal encryption, 2: Walrus blob registration, 3: Anchored
        progress: 25,
        failed: false
      };
      state.activeUploads.push(task);
      uploadQueue.push(task);
    }

    // Show floating upload dock non-blockingly
    uploadDock.classList.remove("hidden", "fade-out");
    if (dockCloseBtn) dockCloseBtn.classList.add("hidden");
    if (dockSpinner) dockSpinner.style.display = "block";
    renderPhotos();

    // Trigger queue processing
    if (!isUploadingQueue) {
      processUploadQueue();
    }
  }

  async function processUploadQueue() {
    if (uploadQueue.length === 0) {
      isUploadingQueue = false;
      return;
    }

    isUploadingQueue = true;
    let completedInBatch = 0;

    while (uploadQueue.length > 0) {
      const task = uploadQueue.shift();
      const currentNum = completedInBatch + 1;
      const totalNum = completedInBatch + uploadQueue.length + 1;

      // Update Dock UI with active task
      dockTitle.textContent = t("upload_dock_title");
      dockSubtitle.textContent = t("upload_dock_count", { current: currentNum, total: totalNum });
      dockFileThumb.src = task.previewUrl;
      dockFileName.textContent = task.name;
      dockFileMeta.textContent = `${formatBytes(task.size)} • Seal Encrypting`;

      // Stepper to Step 1
      dockStep1.className = "dock-step active";
      dockStep2.className = "dock-step";
      dockStep3.className = "dock-step";

      // Overall progress
      const baseProgress = (completedInBatch / totalNum) * 100;
      dockProgressFill.style.width = `${baseProgress + (1 / totalNum) * 30}%`;

      // Optimistic card update
      updateOptimisticCard(task.id, 1, 30, t("optimistic_encrypting"));

      // Large files are encrypted and transmitted in 8 MiB authenticated chunks.
      // This avoids File.arrayBuffer() for the entire file and allows the gateway
      // to retain completed parts when a connection is interrupted.
      if (task.file.size > RESUMABLE_THRESHOLD_BYTES) {
        try {
          task.stage = 2;
          dockFileMeta.textContent = `${formatBytes(task.size)} • Resumable encrypted upload`;
          dockStep1.className = "dock-step completed";
          dockStep2.className = "dock-step active";
          const data = await uploadResumableEncryptedAsset(task.file, ({ uploadedBytes, totalBytes }) => {
            const ratio = uploadedBytes / totalBytes;
            const progress = 30 + (ratio * 60);
            dockProgressFill.style.width = `${baseProgress + (1 / totalNum) * progress}%`;
            updateOptimisticCard(task.id, 2, progress, `${Math.round(ratio * 100)}% encrypted & uploaded`);
          });

          lastUploadedBlobId = data.asset?.blob_id || data.asset?.blobId || null;
          if (data.asset?.id) {
            try {
              await persistOwnerEnvelope(data.asset.id, data.clientKey);
            } catch (error) {
              await discardUnprotectedAsset(data.asset.id);
              throw error;
            }
            decryptedMediaCache.set(data.asset.id, task.previewUrl);
            assetKeyCache.set(data.asset.id, data.clientKey);
          }
          task.stage = 3;
          task.progress = 100;
          dockStep2.className = "dock-step completed";
          dockStep3.className = "dock-step completed";
          dockProgressFill.style.width = `${((completedInBatch + 1) / totalNum) * 100}%`;
          updateOptimisticCard(task.id, 3, 100, t("optimistic_anchored"));
          showToast("Arquivo protegido e armazenado no Walrus Testnet.", "success");
          completedInBatch++;
          await new Promise((r) => setTimeout(r, 400));
          state.activeUploads = state.activeUploads.filter((t) => t.id !== task.id);
          await fetchPhotos();
          await fetchStatus();
        } catch (err) {
          task.failed = true;
          updateOptimisticCard(task.id, 1, 100, t("optimistic_failed"));
          const resumeHint = err.uploadId ? ` Upload session: ${err.uploadId}` : "";
          showToast(`Large upload failed for ${task.name}: ${err.message}.${resumeHint}`, "danger");
          state.activeUploads = state.activeUploads.filter((t) => t.id !== task.id);
          renderPhotos();
        }
        continue;
      }

      // Zero-Knowledge Client-Side Encryption via WebCrypto AES-GCM
      let encryptedPayload;
      try {
        encryptedPayload = await NodusCrypto.encryptAsset(task.file);
      } catch (encErr) {
        task.failed = true;
        updateOptimisticCard(task.id, 1, 100, t("optimistic_failed"));
        showToast(`Encryption failed for ${task.name}: ${encErr.message}`, "danger");
        state.activeUploads = state.activeUploads.filter((t) => t.id !== task.id);
        renderPhotos();
        continue;
      }

      // Advance to Step 2: Walrus Blob Registration
      task.stage = 2;
      task.progress = 70;
      dockFileMeta.textContent = `${formatBytes(task.size)} • Walrus Storage`;
      dockStep1.className = "dock-step completed";
      dockStep2.className = "dock-step active";
      dockProgressFill.style.width = `${baseProgress + (1 / totalNum) * 70}%`;
      updateOptimisticCard(task.id, 2, 70, t("optimistic_uploading"));

      const formData = new FormData();
      formData.append("photo", encryptedPayload.ciphertextBlob, task.file.name);
      formData.append("iv", encryptedPayload.ivHex);
      formData.append("originalName", encryptedPayload.originalName);
      formData.append("originalType", encryptedPayload.originalType);
      formData.append("originalSize", String(encryptedPayload.originalSize));
      formData.append("description", `Zero-Knowledge encrypted asset uploaded to Walrus at ${new Date().toISOString()}`);

      try {
        const res = await apiFetch("/api/photos/upload", {
          method: "POST",
          body: formData
        });
        const data = await res.json();

        if (data.success) {
          // Track blob ID for on-chain proof link
          lastUploadedBlobId = data.photo?.blob_id || data.file?.blob_id || null;

          // Cache raw object URL for immediate in-session display without re-downloading ciphertext
          if (data.photo?.id) {
            try {
              await persistOwnerEnvelope(data.photo.id, encryptedPayload.keyHex);
            } catch (error) {
              await discardUnprotectedAsset(data.photo.id);
              throw error;
            }
            decryptedMediaCache.set(data.photo.id, task.previewUrl);
            assetKeyCache.set(data.photo.id, encryptedPayload.keyHex);
          }

          // Advance to Step 3: Anchored in Bucket
          task.stage = 3;
          task.progress = 100;
          dockStep2.className = "dock-step completed";
          dockStep3.className = "dock-step completed";
          dockProgressFill.style.width = `${((completedInBatch + 1) / totalNum) * 100}%`;
          updateOptimisticCard(task.id, 3, 100, t("optimistic_anchored"));

          showToast("Arquivo protegido e armazenado no Walrus Testnet.", "success");
          completedInBatch++;

          // Give a brief moment to celebrate the green checkmark
          await new Promise((r) => setTimeout(r, 400));

          // Clean up task from activeUploads (do not revoke previewUrl since it is stored in decryptedMediaCache)
          state.activeUploads = state.activeUploads.filter((t) => t.id !== task.id);

          // Refresh photos & status non-blockingly
          await fetchPhotos();
          await fetchStatus();
        } else {
          task.failed = true;
          updateOptimisticCard(task.id, 1, 100, t("optimistic_failed"));
          showToast(`Upload failed for ${task.name}: ${data.error}`, "danger");
          state.activeUploads = state.activeUploads.filter((t) => t.id !== task.id);
          renderPhotos();
        }
      } catch (err) {
        task.failed = true;
        showToast(`Error uploading ${task.name}: ${err.message}`, "danger");
        state.activeUploads = state.activeUploads.filter((t) => t.id !== task.id);
        renderPhotos();
      }
    }

    // All uploads finished
    isUploadingQueue = false;
    dockTitle.textContent = t("upload_dock_complete");
    dockSubtitle.textContent = `${completedInBatch} ${completedInBatch === 1 ? "memory" : "memories"} anchored`;
    if (dockSpinner) dockSpinner.style.display = "none";
    if (dockCloseBtn) dockCloseBtn.classList.remove("hidden");
    dockProgressFill.style.width = "100%";

    // Display on-chain proof directly in dock upon successful completion
    const dockOnchainProof = document.getElementById("dockOnchainProof");
    const dockWalrusLink = document.getElementById("dockWalruscanLink");
    const dockSuiLink = document.getElementById("dockSuivisionLink");

    if (dockOnchainProof && completedInBatch > 0) {
      const policyId = state.status?.bucket?.seal_policy_id || "0x9c1baccb244e45342ac150a0123a4802e8e834f25c00210e50c81081354eee44";
      if (dockSuiLink) {
        dockSuiLink.href = `https://suivision.xyz/object/${policyId}`;
      }
      if (dockWalrusLink) {
        if (lastUploadedBlobId) {
          dockWalrusLink.href = `https://walruscan.com/testnet/blob/${lastUploadedBlobId}`;
        } else {
          dockWalrusLink.href = "https://walruscan.com/testnet";
        }
      }
      dockOnchainProof.classList.remove("hidden");
      if (window.lucide) window.lucide.createIcons();
    }

    // Auto-dismiss the dock after 10 seconds
    setTimeout(() => {
      if (!isUploadingQueue && state.activeUploads.length === 0) {
        uploadDock.classList.add("fade-out");
        setTimeout(() => {
          uploadDock.classList.add("hidden");
          uploadDock.classList.remove("fade-out");
        }, 300);
      }
    }, 10000);
  }

  function requireAuth() {
    if (!state.currentUser?.accessToken || !activeTenantId()) {
      openZkLoginModal();
      showToast("Sign in with a provisioned Solana organization to store encrypted assets", "info");
      return false;
    }
    return true;
  }

  uploadTriggerBtn.addEventListener("click", () => {
    if (requireAuth()) fileInput.click();
  });
  browseBtn.addEventListener("click", () => {
    if (requireAuth()) fileInput.click();
  });
  dropZone.addEventListener("click", () => {
    if (requireAuth()) fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    handleFilesUpload(e.target.files);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove("drag-over");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFilesUpload(files);
  });

  // Global Window Drag & Drop Overlay
  let dragCounter = 0;
  window.addEventListener("dragenter", (e) => {
    e.preventDefault();
    if (e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files")) {
      dragCounter++;
      if (dragDropOverlay) dragDropOverlay.classList.remove("hidden");
    }
  });

  window.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  window.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      if (dragDropOverlay) dragDropOverlay.classList.add("hidden");
    }
  });

  window.addEventListener("drop", (e) => {
    e.preventDefault();
    dragCounter = 0;
    if (dragDropOverlay) dragDropOverlay.classList.add("hidden");
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  });

  // Search filter with 120ms debounce for smoother typing and low DOM overhead
  let searchDebounceTimer = null;
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery.length > 0) {
      clearSearchBtn.classList.remove("hidden");
    } else {
      clearSearchBtn.classList.add("hidden");
    }
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      renderPhotos();
    }, 120);
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    clearSearchBtn.classList.add("hidden");
    renderPhotos();
  });

  // Refresh
  refreshBtn.addEventListener("click", () => {
    refreshBtn.classList.add("spinning");
    Promise.all([fetchPhotos(), fetchStatus()]).finally(() => {
      refreshBtn.classList.remove("spinning");
    });
  });

  // Network Reconnection & Asynchrony Safety
  window.addEventListener("online", () => {
    showToast(t("toast_conn_restored"), "success");
    if (state.currentUser) {
      fetchPhotos();
      fetchStatus();
    }
  });

  window.addEventListener("offline", () => {
    showToast(t("toast_conn_lost"), "warning");
  });

  // ==========================================
  // VIEW SWITCHING (LANDING PAGE <-> CONSOLE APP)
  // ==========================================
  function showLandingView(updateHash = true) {
    if (landingView) landingView.classList.remove("hidden");
    if (appView) appView.classList.add("hidden");
    if (updateHash && window.location.hash === "#app") {
      history.pushState(null, "", window.location.pathname + window.location.search);
    }
    if (window.location.hash && window.location.hash !== "#" && window.location.hash !== "#app") {
      try {
        const targetEl = document.querySelector(window.location.hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      } catch (_) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function showAppView(updateHash = true) {
    if (landingView) landingView.classList.add("hidden");
    if (appView) appView.classList.remove("hidden");
    if (updateHash && window.location.hash !== "#app") {
      window.location.hash = "#app";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.lucide) window.lucide.createIcons();
  }

  if (launchAppNavBtn) launchAppNavBtn.addEventListener("click", () => showAppView(true));
  if (launchAppHeroBtn) launchAppHeroBtn.addEventListener("click", () => showAppView(true));
  if (launchAppCtaBtn) launchAppCtaBtn.addEventListener("click", () => showAppView(true));
  if (launchAppVerifyBtn) launchAppVerifyBtn.addEventListener("click", () => showAppView(true));
  if (landingSignInBtn) {
    landingSignInBtn.addEventListener("click", () => {
      showAppView(true);
      openZkLoginModal();
    });
  }
  if (landingDemoBtn) {
    landingDemoBtn.addEventListener("click", (e) => {
      const demoSec = document.getElementById("demo");
      if (demoSec) {
        e.preventDefault();
        demoSec.scrollIntoView({ behavior: "smooth" });
      } else {
        showAppView(true);
      }
    });
  }
  if (backToLandingBtn) backToLandingBtn.addEventListener("click", () => showLandingView(true));
  if (landingLogoBtn) landingLogoBtn.addEventListener("click", () => showLandingView(true));

  // ==========================================
  // Interactive Sovereign Encryption Playground
  // ==========================================
  function initLandingPlayground() {
    const demoSection = document.getElementById("demo");
    if (!demoSection) return;

    const viewport = document.getElementById("playgroundViewport");
    const plainImg = document.getElementById("playgroundPlainImage");
    const cipherLayer = document.getElementById("playgroundCipherLayer");
    const cipherCanvas = document.getElementById("playgroundCipherCanvas");
    const splitHandle = document.getElementById("playgroundSplitHandle");
    const statusText = document.getElementById("playgroundStatusText");
    const loopBtn = document.getElementById("playgroundLoopBtn");
    const loopText = document.getElementById("playgroundLoopText");
    const runBtn = document.getElementById("playgroundRunBtn");
    const decryptBtn = document.getElementById("playgroundDecryptBtn");
    const launchBtn = document.getElementById("playgroundLaunchBtn");
    const fileInput = document.getElementById("playgroundFileInput");

    // Telemetry DOM elements
    const teleStep1 = document.getElementById("teleStep1");
    const teleStep2 = document.getElementById("teleStep2");
    const teleStep3 = document.getElementById("teleStep3");
    const teleStep4 = document.getElementById("teleStep4");
    const teleTimeSeal = document.getElementById("teleTimeSeal");
    const teleKeyPreview = document.getElementById("teleKeyPreview");
    const teleIvPreview = document.getElementById("teleIvPreview");
    const teleSliversBadge = document.getElementById("teleSliversBadge");
    const teleBlobId = document.getElementById("teleBlobId");
    const teleBlakeDigest = document.getElementById("teleBlakeDigest");

    // Presets
    const presetBtns = document.querySelectorAll(".nd-preset-btn[data-preset]");

    const presets = {
      guardian: "/assets/guardian-blue.png",
      sunset: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0b1b3d"/>
              <stop offset="45%" stop-color="#fd5e53"/>
              <stop offset="70%" stop-color="#ffb703"/>
              <stop offset="100%" stop-color="#219ebc"/>
            </linearGradient>
            <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#14213d"/>
              <stop offset="100%" stop-color="#050a14"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="800" height="420" fill="url(#sky)"/>
          <circle cx="400" cy="380" r="90" fill="#ffeaa7" filter="url(#glow)" opacity="0.9"/>
          <rect y="420" width="800" height="180" fill="url(#water)"/>
          <path d="M 0 420 Q 200 415 400 420 T 800 420 L 800 435 L 0 435 Z" fill="#ffd166" opacity="0.3"/>
          <path d="M 100 420 L 250 210 L 260 210 L 400 420 L 540 210 L 550 210 L 700 420 Z" fill="none" stroke="#e63946" stroke-width="8"/>
          <line x1="255" y1="210" x2="255" y2="420" stroke="#e63946" stroke-width="6"/>
          <line x1="545" y1="210" x2="545" y2="420" stroke="#e63946" stroke-width="6"/>
          <line x1="0" y1="360" x2="800" y2="360" stroke="#f1faee" stroke-width="5"/>
        </svg>
      `),
      space: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
          <defs>
            <radialGradient id="nebula1" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#7209b7" stop-opacity="0.8"/>
              <stop offset="50%" stop-color="#3a0ca3" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#03071e" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="nebula2" cx="70%" cy="60%" r="50%">
              <stop offset="0%" stop-color="#4cc9f0" stop-opacity="0.7"/>
              <stop offset="60%" stop-color="#4361ee" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#03071e" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#02040a"/>
          <rect width="800" height="600" fill="url(#nebula1)"/>
          <rect width="800" height="600" fill="url(#nebula2)"/>
          <circle cx="120" cy="80" r="1.5" fill="#fff" opacity="0.9"/>
          <circle cx="280" cy="140" r="2" fill="#fff" opacity="0.8"/>
          <circle cx="450" cy="90" r="1" fill="#fff" opacity="0.7"/>
          <circle cx="620" cy="160" r="2.5" fill="#4cc9f0" opacity="0.9"/>
          <circle cx="190" cy="320" r="1.5" fill="#fff" opacity="0.6"/>
          <circle cx="510" cy="280" r="3" fill="#f72585" opacity="0.8"/>
          <circle cx="710" cy="380" r="1.5" fill="#fff" opacity="0.7"/>
          <circle cx="340" cy="460" r="2" fill="#fff" opacity="0.9"/>
          <circle cx="150" cy="520" r="1" fill="#fff" opacity="0.8"/>
          <circle cx="600" cy="500" r="2.5" fill="#fff" opacity="0.85"/>
        </svg>
      `)
    };

    let currentSplit = 50;
    let isDragging = false;
    let autoLoopActive = true;
    let loopTimer = null;
    let currentStep = 1;
    let cryptoState = {
      key: null,
      iv: null,
      ciphertext: null,
      sampleBytes: new TextEncoder().encode("NODUS_SOVEREIGN_PAYLOAD_SAMPLE_DATA_ENCRYPTION_STREAM")
    };

    // Matrix Rain Canvas Simulation
    let canvasCtx = null;
    let matrixColumns = [];
    const characters = "01ABCDEF9A4FC2E83B7D!@#$%&*+=/?~0xNODEWALRUSSUI";

    function setupCanvas() {
      if (!cipherCanvas) return;
      canvasCtx = cipherCanvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = cipherCanvas.getBoundingClientRect();
      const w = rect.width || 400;
      const h = rect.height || 420;
      cipherCanvas.width = w * dpr;
      cipherCanvas.height = h * dpr;
      if (canvasCtx) canvasCtx.scale(dpr, dpr);

      const colCount = Math.floor(w / 14);
      matrixColumns = [];
      for (let i = 0; i < colCount; i++) {
        matrixColumns.push({
          y: Math.random() * h,
          speed: 1.5 + Math.random() * 2.5
        });
      }
    }

    function renderMatrix() {
      if (!cipherCanvas || !canvasCtx) return;
      const rect = cipherCanvas.getBoundingClientRect();
      const w = rect.width || 400;
      const h = rect.height || 420;

      canvasCtx.fillStyle = "rgba(4, 8, 12, 0.15)";
      canvasCtx.fillRect(0, 0, w, h);

      canvasCtx.font = "11px monospace";
      for (let i = 0; i < matrixColumns.length; i++) {
        const col = matrixColumns[i];
        const x = i * 14;
        const char = characters.charAt(Math.floor(Math.random() * characters.length));

        if (Math.random() > 0.88) {
          canvasCtx.fillStyle = "#ffffff";
        } else if (Math.random() > 0.5) {
          canvasCtx.fillStyle = "#1FA8FF";
        } else {
          canvasCtx.fillStyle = "#00e5ff";
        }

        canvasCtx.fillText(char, x, col.y);

        col.y += col.speed * 6;
        if (col.y > h + 20) {
          col.y = 0;
          col.speed = 1.5 + Math.random() * 2.5;
        }
      }

      requestAnimationFrame(renderMatrix);
    }

    function setSplitPosition(pct) {
      currentSplit = Math.max(0, Math.min(100, pct));
      if (splitHandle) splitHandle.style.left = currentSplit + "%";
      if (cipherLayer) cipherLayer.style.width = (100 - currentSplit) + "%";
    }

    function handleDrag(e) {
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      setSplitPosition(pct);
    }

    if (viewport) {
      viewport.addEventListener("mousedown", (e) => {
        isDragging = true;
        pauseAutoLoop();
        handleDrag(e);
      });
      window.addEventListener("mousemove", (e) => {
        if (isDragging) handleDrag(e);
      });
      window.addEventListener("mouseup", () => {
        isDragging = false;
      });

      viewport.addEventListener("touchstart", (e) => {
        isDragging = true;
        pauseAutoLoop();
        handleDrag(e);
      }, { passive: true });
      window.addEventListener("touchmove", (e) => {
        if (isDragging) handleDrag(e);
      }, { passive: true });
      window.addEventListener("touchend", () => {
        isDragging = false;
      });

      // Drag & drop custom image onto viewport
      viewport.addEventListener("dragover", (e) => {
        e.preventDefault();
        viewport.style.borderColor = "var(--nd-blue)";
      });
      viewport.addEventListener("dragleave", () => {
        viewport.style.borderColor = "var(--nd-slate-a24)";
      });
      viewport.addEventListener("drop", (e) => {
        e.preventDefault();
        viewport.style.borderColor = "var(--nd-slate-a24)";
        pauseAutoLoop();
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          loadCustomImage(e.dataTransfer.files[0]);
        }
      });
    }

    function loadCustomImage(file) {
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (plainImg) plainImg.src = ev.target.result;
        presetBtns.forEach(btn => btn.classList.remove("active"));
        if (statusText) statusText.textContent = `Custom Photo: ${file.name} — Encrypted`;
        runEncryptionPipeline();
      };
      reader.readAsDataURL(file);
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        pauseAutoLoop();
        if (e.target.files && e.target.files[0]) {
          loadCustomImage(e.target.files[0]);
        }
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        pauseAutoLoop();
        presetBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const presetKey = btn.getAttribute("data-preset");
        if (presets[presetKey] && plainImg) {
          plainImg.src = presets[presetKey];
          if (statusText) statusText.textContent = `Preset: ${btn.textContent.trim()} — Encrypted`;
          runEncryptionPipeline();
        }
      });
    });

    async function runEncryptionPipeline() {
      try {
        const t0 = performance.now();
        const key = await window.crypto.subtle.generateKey(
          { name: "AES-GCM", length: 256 },
          true,
          ["encrypt", "decrypt"]
        );
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const rawKey = await window.crypto.subtle.exportKey("raw", key);
        const keyArray = new Uint8Array(rawKey);
        const keyHex = Array.from(keyArray).map(b => b.toString(16).padStart(2, '0')).join('');
        const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');

        const ciphertext = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv: iv },
          key,
          cryptoState.sampleBytes
        );
        const t1 = performance.now();
        const durationMs = (t1 - t0).toFixed(1);

        cryptoState.key = key;
        cryptoState.iv = iv;
        cryptoState.ciphertext = ciphertext;

        let blakeHex = "0x8f19...d093";
        if (window.nobleBlake2 && window.nobleBlake2.blake2b) {
          try {
            const digest = window.nobleBlake2.blake2b(new Uint8Array(ciphertext), { dkLen: 32 });
            const digestHex = Array.from(digest).map(b => b.toString(16).padStart(2, '0')).join('');
            blakeHex = "0x" + digestHex.slice(0, 4) + "..." + digestHex.slice(-4);
          } catch (_) {}
        }

        const blobRand = Array.from(window.crypto.getRandomValues(new Uint8Array(4)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        const blobIdStr = `walrus:blob:${blobRand}...`;

        if (teleTimeSeal) teleTimeSeal.textContent = `${durationMs} ms`;
        if (teleKeyPreview) teleKeyPreview.textContent = `0x${keyHex.slice(0, 4)}...${keyHex.slice(-4)}`;
        if (teleIvPreview) teleIvPreview.textContent = `0x${ivHex.slice(0, 4)}...${ivHex.slice(-4)}`;
        if (teleBlobId) teleBlobId.textContent = blobIdStr;
        if (teleBlakeDigest) teleBlakeDigest.textContent = blakeHex;

        highlightStep(1);
        if (statusText) statusText.textContent = "AES-256-GCM Envelope Sealed • Ready for Walrus Dispersal";
      } catch (err) {
        console.warn("Playground WebCrypto error:", err);
      }
    }

    function highlightStep(stepNum) {
      currentStep = stepNum;
      [teleStep1, teleStep2, teleStep3, teleStep4].forEach((stepEl, idx) => {
        if (!stepEl) return;
        if (idx + 1 === stepNum) {
          stepEl.classList.add("active");
        } else {
          stepEl.classList.remove("active");
        }
      });
    }

    async function runDecryption() {
      if (!cryptoState.key || !cryptoState.ciphertext) {
        await runEncryptionPipeline();
      }
      try {
        const decrypted = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: cryptoState.iv },
          cryptoState.key,
          cryptoState.ciphertext
        );
        highlightStep(4);
        if (statusText) statusText.textContent = "✅ Decrypted in Browser RAM • Bit-for-Bit 100% Match";

        let startPct = currentSplit;
        const targetPct = 100;
        const startTime = performance.now();
        const duration = 500;

        function stepAnim(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const ease = 1 - Math.pow(1 - progress, 3);
          setSplitPosition(startPct + (targetPct - startPct) * ease);
          if (progress < 1) {
            requestAnimationFrame(stepAnim);
          }
        }
        requestAnimationFrame(stepAnim);
      } catch (e) {
        console.warn("Decryption error in demo:", e);
      }
    }

    if (decryptBtn) {
      decryptBtn.addEventListener("click", () => {
        pauseAutoLoop();
        runDecryption();
      });
    }

    if (runBtn) {
      runBtn.addEventListener("click", () => {
        pauseAutoLoop();
        runEncryptionPipeline();
        setSplitPosition(50);
      });
    }

    function pauseAutoLoop() {
      autoLoopActive = false;
      if (loopTimer) clearInterval(loopTimer);
      if (loopText) loopText.textContent = "Auto Loop: Off";
      if (loopBtn) loopBtn.classList.remove("active");
    }

    function toggleAutoLoop() {
      autoLoopActive = !autoLoopActive;
      if (autoLoopActive) {
        if (loopText) loopText.textContent = "Auto Loop: On";
        if (loopBtn) loopBtn.classList.add("active");
        startLoopTimer();
      } else {
        pauseAutoLoop();
      }
    }

    if (loopBtn) {
      loopBtn.addEventListener("click", toggleAutoLoop);
    }

    function startLoopTimer() {
      if (loopTimer) clearInterval(loopTimer);
      loopTimer = setInterval(async () => {
        if (!autoLoopActive) return;
        const nextStep = (currentStep % 4) + 1;
        highlightStep(nextStep);

        if (nextStep === 1) {
          await runEncryptionPipeline();
          setSplitPosition(50);
        } else if (nextStep === 2) {
          if (statusText) statusText.textContent = "2D Reed-Solomon Erasure Coding • 45 Slivers Dispersed";
          setSplitPosition(30);
        } else if (nextStep === 3) {
          if (statusText) statusText.textContent = "Sui & Solana Multi-Chain Certificates Anchored";
          setSplitPosition(70);
        } else if (nextStep === 4) {
          await runDecryption();
        }
      }, 3500);
    }

    if (launchBtn) {
      launchBtn.addEventListener("click", () => showAppView(true));
    }

    window.addEventListener("resize", () => {
      setupCanvas();
    });

    setupCanvas();
    renderMatrix();
    runEncryptionPipeline();
    setSplitPosition(50);
    startLoopTimer();
    if (window.lucide) window.lucide.createIcons();
  }

  // ==========================================
  // PHASE 2 & 3: DEVELOPER API KEYS & TEAM RBAC
  // ==========================================
  function initDeveloperPortal() {
    const devNavBtn = document.getElementById("devPortalNavBtn");
    const devModal = document.getElementById("developerKeysModal");
    const devCloseBtn = document.getElementById("developerKeysModalClose");
    const devCloseFooterBtn = document.getElementById("developerKeysModalCloseBtn");
    const devBackdrop = document.getElementById("developerKeysModalBackdrop");
    const generateSubmitBtn = document.getElementById("generateKeySubmitBtn");
    const keyNameInput = document.getElementById("newKeyNameInput");
    const copyRevealedBtn = document.getElementById("copyRevealedKeyBtn");
    const secretRevealBox = document.getElementById("devSecretReveal");
    const revealedCode = document.getElementById("revealedSecretKey");
    const snippetCode = document.getElementById("devSnippetCode");

    const tabCurl = document.getElementById("tabCurlBtn");
    const tabNode = document.getElementById("tabNodeBtn");
    const tabPython = document.getElementById("tabPythonBtn");

    let currentRevealedKey = "";

    function updateCodeSnippet(lang = "curl") {
      const displayKey = currentRevealedKey || "nd_live_your_api_key_here";
      const origin = window.location.origin;
      if (lang === "curl") {
        if (snippetCode) snippetCode.textContent = `curl -X GET "${origin}/api/tenant/usage" \\\n  -H "Authorization: Bearer ${displayKey}"`;
      } else if (lang === "node") {
        if (snippetCode) snippetCode.textContent = `import { createNodusClient } from "@nodus/sdk";\n\nconst nodus = createNodusClient({\n  gatewayUrl: "${origin}",\n  apiKey: "${displayKey}"\n});\n\nconst usage = await nodus.request("/api/tenant/usage");\nconsole.log("Active Storage:", usage);`;
      } else if (lang === "python") {
        if (snippetCode) snippetCode.textContent = `import requests\n\nheaders = {"Authorization": "Bearer ${displayKey}"}\nresponse = requests.get("${origin}/api/tenant/usage", headers=headers)\nprint(response.json())`;
      }
    }

    if (tabCurl) tabCurl.addEventListener("click", () => {
      [tabCurl, tabNode, tabPython].forEach(b => b?.classList.remove("active"));
      tabCurl.classList.add("active");
      updateCodeSnippet("curl");
    });
    if (tabNode) tabNode.addEventListener("click", () => {
      [tabCurl, tabNode, tabPython].forEach(b => b?.classList.remove("active"));
      tabNode.classList.add("active");
      updateCodeSnippet("node");
    });
    if (tabPython) tabPython.addEventListener("click", () => {
      [tabCurl, tabNode, tabPython].forEach(b => b?.classList.remove("active"));
      tabPython.classList.add("active");
      updateCodeSnippet("python");
    });

    async function loadUsage() {
      try {
        const token = localStorage.getItem("nodus_session_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch("/api/tenant/usage", { headers });
        if (!res.ok) return;
        const data = await res.json();
        if (!data.success || !data.usage) return;
        const u = data.usage;
        const usedMb = (u.usedBytes / (1024 * 1024)).toFixed(1);
        const quotaGb = (u.quotaBytes / (1024 * 1024 * 1024)).toFixed(1);
        const storageUsedEl = document.getElementById("devStorageUsed");
        const storageQuotaEl = document.getElementById("devStorageQuota");
        const storageProgressEl = document.getElementById("devStorageProgress");
        const activeKeysCountEl = document.getElementById("devActiveKeysCount");
        const storageProviderEl = document.getElementById("devStorageProvider");
        const estimatedCostEl = document.getElementById("devEstimatedCost");

        if (storageUsedEl) storageUsedEl.textContent = `${usedMb} MB`;
        if (storageQuotaEl) storageQuotaEl.textContent = `Quota: ${quotaGb} GB`;
        if (storageProgressEl) storageProgressEl.style.width = `${Math.min(100, Math.max(2, u.percentUsed || 0))}%`;
        if (activeKeysCountEl) activeKeysCountEl.textContent = String(u.activeApiKeys || 0);
        if (storageProviderEl) storageProviderEl.textContent = u.storageProvider === "s3_byos" ? "S3 BYOS" : "Walrus Verify";
        if (estimatedCostEl && u.pricing?.estimatedMonthlyCostBrl) {
          estimatedCostEl.textContent = `R$ ${u.pricing.estimatedMonthlyCostBrl.toFixed(2)}`;
        }
      } catch (e) {
        console.warn("Failed to load tenant usage:", e);
      }
    }

    async function loadApiKeys() {
      const tbody = document.getElementById("devKeysTableBody");
      if (!tbody) return;
      try {
        const token = localStorage.getItem("nodus_session_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch("/api/tenant/api-keys", { headers });
        if (!res.ok) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Sign in to view your company's active API keys.</td></tr>`;
          return;
        }
        const data = await res.json();
        if (!data.success || !Array.isArray(data.apiKeys) || data.apiKeys.length === 0) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No active API keys yet. Create one above to get started.</td></tr>`;
          return;
        }
        tbody.innerHTML = data.apiKeys.map(k => {
          const dateStr = k.createdAt ? new Date(k.createdAt).toLocaleDateString() : "--";
          const scopesStr = Array.isArray(k.scopes) ? k.scopes.join(", ") : "assets:read, assets:write";
          return `
            <tr>
              <td><strong>${escapeHtml(k.name || "API Key")}</strong></td>
              <td><code>${escapeHtml(k.keyPrefix || k.key_prefix || "ndk_****")}...</code></td>
              <td><span style="font-size: 0.72rem; color: #38bdf8;">${escapeHtml(scopesStr)}</span></td>
              <td>${dateStr}</td>
              <td><button class="btn btn-sm btn-outline revoke-key-btn" data-key-id="${k.id}">Revoke</button></td>
            </tr>
          `;
        }).join("");

        tbody.querySelectorAll(".revoke-key-btn").forEach(btn => {
          btn.addEventListener("click", async (ev) => {
            const keyId = ev.currentTarget.getAttribute("data-key-id");
            if (!confirm("Are you sure you want to revoke this API key? Applications using it will immediately be rejected.")) return;
            try {
              const token = localStorage.getItem("nodus_session_token");
              const headers = token ? { Authorization: `Bearer ${token}` } : {};
              const delRes = await fetch(`/api/orgs/nodus-devs/api-keys/${keyId}`, {
                method: "DELETE",
                headers
              });
              if (delRes.ok) {
                loadApiKeys();
                loadUsage();
              }
            } catch (err) {
              alert("Failed to revoke API key: " + err.message);
            }
          });
        });
      } catch (e) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Failed to load API keys.</td></tr>`;
      }
    }

    function openModal() {
      devModal?.classList.remove("hidden");
      switchPortalTab("keys");
      loadUsage();
      loadApiKeys();
      loadStorageConfig();
      if (window.lucide) window.lucide.createIcons();
    }

    function closeModal() {
      devModal?.classList.add("hidden");
    }

    if (devNavBtn) devNavBtn.addEventListener("click", openModal);
    if (devCloseBtn) devCloseBtn.addEventListener("click", closeModal);
    if (devCloseFooterBtn) devCloseFooterBtn.addEventListener("click", closeModal);
    if (devBackdrop) devBackdrop.addEventListener("click", closeModal);

    if (generateSubmitBtn) {
      generateSubmitBtn.addEventListener("click", async () => {
        const name = (keyNameInput?.value || "").trim() || "B2B Client Service";
        const scopes = [];
        if (document.getElementById("scopeAssetsRead")?.checked) scopes.push("assets:read");
        if (document.getElementById("scopeAssetsWrite")?.checked) scopes.push("assets:write");
        if (document.getElementById("scopeAssetsDelete")?.checked) scopes.push("assets:delete");
        if (document.getElementById("scopeSearchRead")?.checked) scopes.push("search:read");

        try {
          generateSubmitBtn.disabled = true;
          generateSubmitBtn.innerHTML = '<span class="spinner-sm"></span> Generating...';
          const token = localStorage.getItem("nodus_session_token");
          const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          };
          const res = await fetch("/api/tenant/api-keys", {
            method: "POST",
            headers,
            body: JSON.stringify({ name, scopes })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || "Failed to generate key");

          currentRevealedKey = data.secretKey || data.key || "";
          if (revealedCode) revealedCode.textContent = currentRevealedKey;
          secretRevealBox?.classList.remove("hidden");
          if (keyNameInput) keyNameInput.value = "";
          updateCodeSnippet("curl");
          loadApiKeys();
          loadUsage();
        } catch (err) {
          alert("Error generating API key: " + err.message);
        } finally {
          generateSubmitBtn.disabled = false;
          generateSubmitBtn.innerHTML = '<i data-lucide="plus-circle"></i> <span>Generate Key</span>';
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    if (copyRevealedBtn) {
      copyRevealedBtn.addEventListener("click", () => {
        if (!currentRevealedKey) return;
        navigator.clipboard.writeText(currentRevealedKey).then(() => {
          copyRevealedBtn.innerHTML = '<i data-lucide="check"></i> <span>Copied!</span>';
          setTimeout(() => {
            copyRevealedBtn.innerHTML = '<i data-lucide="copy"></i> <span>Copy Key</span>';
            if (window.lucide) window.lucide.createIcons();
          }, 2500);
        });
      });
    }

    // --- Portal Top Tabs ---
    const portalTabKeys = document.getElementById("portalTabKeysBtn");
    const portalTabStorage = document.getElementById("portalTabStorageBtn");
    const portalTabSdk = document.getElementById("portalTabSdkBtn");
    const panelKeys = document.getElementById("devPanelKeys");
    const panelStorage = document.getElementById("devPanelStorage");
    const panelSdk = document.getElementById("devPanelSdk");

    function switchPortalTab(target) {
      [portalTabKeys, portalTabStorage, portalTabSdk].forEach(b => b?.classList.remove("active"));
      [panelKeys, panelStorage, panelSdk].forEach(p => p?.classList.add("hidden"));
      if (target === "keys") {
        portalTabKeys?.classList.add("active");
        panelKeys?.classList.remove("hidden");
        loadUsage();
        loadApiKeys();
      } else if (target === "storage") {
        portalTabStorage?.classList.add("active");
        panelStorage?.classList.remove("hidden");
        loadStorageConfig();
      } else if (target === "sdk") {
        portalTabSdk?.classList.add("active");
        panelSdk?.classList.remove("hidden");
        updateCodeSnippet("curl");
      }
      if (window.lucide) window.lucide.createIcons();
    }

    if (portalTabKeys) portalTabKeys.addEventListener("click", () => switchPortalTab("keys"));
    if (portalTabStorage) portalTabStorage.addEventListener("click", () => switchPortalTab("storage"));
    if (portalTabSdk) portalTabSdk.addEventListener("click", () => switchPortalTab("sdk"));

    // --- BYOS Storage Engine Handlers ---
    const byosCardWalrus = document.getElementById("byosCardWalrus");
    const byosCardS3 = document.getElementById("byosCardS3");
    const byosCardR2 = document.getElementById("byosCardR2");
    const byosFormContainer = document.getElementById("byosFormContainer");
    const byosBucketInput = document.getElementById("byosBucketInput");
    const byosEndpointInput = document.getElementById("byosEndpointInput");
    const byosRegionInput = document.getElementById("byosRegionInput");
    const byosAccessKeyInput = document.getElementById("byosAccessKeyInput");
    const byosSecretKeyInput = document.getElementById("byosSecretKeyInput");
    const byosTogglePwdBtn = document.getElementById("byosTogglePwdBtn");
    const byosFeedbackBox = document.getElementById("byosFeedbackBox");
    const byosTestBtn = document.getElementById("byosTestHandshakeBtn");
    const byosSaveBtn = document.getElementById("byosSaveConfigBtn");
    const byosRevertBtn = document.getElementById("byosRevertWalrusBtn");
    const byosActiveTitle = document.getElementById("byosActiveTitle");
    const byosActiveSubtitle = document.getElementById("byosActiveSubtitle");
    const byosBadgeStatus = document.getElementById("byosBadgeStatus");

    let selectedByosProvider = "walrus";

    function selectProviderCard(provider) {
      selectedByosProvider = provider;
      [byosCardWalrus, byosCardS3, byosCardR2].forEach(c => c?.classList.remove("selected"));
      if (provider === "walrus") {
        byosCardWalrus?.classList.add("selected");
        byosFormContainer?.classList.add("hidden");
      } else if (provider === "s3_byos" || provider === "s3") {
        byosCardS3?.classList.add("selected");
        byosFormContainer?.classList.remove("hidden");
      } else if (provider === "r2_byos" || provider === "r2") {
        byosCardR2?.classList.add("selected");
        byosFormContainer?.classList.remove("hidden");
      }
      if (window.lucide) window.lucide.createIcons();
    }

    if (byosCardWalrus) byosCardWalrus.addEventListener("click", () => selectProviderCard("walrus"));
    if (byosCardS3) byosCardS3.addEventListener("click", () => selectProviderCard("s3_byos"));
    if (byosCardR2) byosCardR2.addEventListener("click", () => selectProviderCard("r2_byos"));

    if (byosTogglePwdBtn) {
      byosTogglePwdBtn.addEventListener("click", () => {
        if (!byosSecretKeyInput) return;
        const isPwd = byosSecretKeyInput.type === "password";
        byosSecretKeyInput.type = isPwd ? "text" : "password";
        byosTogglePwdBtn.innerHTML = isPwd ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
        if (window.lucide) window.lucide.createIcons();
      });
    }

    async function loadStorageConfig() {
      try {
        const token = localStorage.getItem("nodus_session_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch("/api/tenant/storage-config", { headers });
        if (!res.ok) return;
        const data = await res.json();
        if (!data.success || !data.config) return;
        const cfg = data.config;
        const prov = cfg.provider || "walrus";
        selectProviderCard(prov);
        if (prov === "walrus") {
          if (byosActiveTitle) byosActiveTitle.textContent = "Active Engine: Walrus Verify";
          if (byosActiveSubtitle) byosActiveSubtitle.textContent = "Decentralized erasure-coded dispersal with Sui on-chain attestations.";
          if (byosBadgeStatus) byosBadgeStatus.textContent = "Connected";
        } else {
          if (byosActiveTitle) byosActiveTitle.textContent = `Active Engine: ${prov === "s3_byos" ? "AWS S3" : "Cloudflare R2"}`;
          if (byosActiveSubtitle) byosActiveSubtitle.textContent = `Private Bucket: ${cfg.bucket || "configured"} • Region: ${cfg.region || "us-east-1"}`;
          if (byosBadgeStatus) byosBadgeStatus.textContent = "BYOS Active";
        }
        if (byosBucketInput && cfg.bucket) byosBucketInput.value = cfg.bucket;
        if (byosEndpointInput && cfg.endpoint) byosEndpointInput.value = cfg.endpoint;
        if (byosRegionInput && cfg.region) byosRegionInput.value = cfg.region;
        if (byosAccessKeyInput && cfg.accessKeyIdMasked) byosAccessKeyInput.placeholder = cfg.accessKeyIdMasked;
      } catch (err) {
        console.warn("Failed to load storage config:", err);
      }
    }

    if (byosTestBtn) {
      byosTestBtn.addEventListener("click", async () => {
        if (byosFeedbackBox) {
          byosFeedbackBox.className = "byos-feedback-box hidden";
        }
        const bucket = (byosBucketInput?.value || "").trim();
        const endpoint = (byosEndpointInput?.value || "").trim();
        const region = (byosRegionInput?.value || "us-east-1").trim();
        const accessKeyId = (byosAccessKeyInput?.value || "").trim();
        const secretAccessKey = (byosSecretKeyInput?.value || "").trim();

        if (selectedByosProvider !== "walrus" && (!bucket || !accessKeyId || !secretAccessKey)) {
          if (byosFeedbackBox) {
            byosFeedbackBox.className = "byos-feedback-box error";
            byosFeedbackBox.textContent = "Bucket name, Access Key ID, and Secret Access Key are required to test connection.";
            byosFeedbackBox.classList.remove("hidden");
          }
          return;
        }

        try {
          byosTestBtn.disabled = true;
          byosTestBtn.innerHTML = '<span class="spinner-sm"></span> Probing Handshake...';
          const token = localStorage.getItem("nodus_session_token");
          const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          };
          const res = await fetch("/api/tenant/storage-config/test", {
            method: "POST",
            headers,
            body: JSON.stringify({
              provider: selectedByosProvider,
              endpoint: endpoint || null,
              bucket,
              region,
              accessKeyId,
              secretAccessKey
            })
          });
          const data = await res.json();
          if (byosFeedbackBox) {
            byosFeedbackBox.className = data.success ? "byos-feedback-box success" : "byos-feedback-box error";
            byosFeedbackBox.textContent = data.success ? `✅ Handshake verified: ${data.message}` : `❌ Handshake failed: ${data.error}`;
            byosFeedbackBox.classList.remove("hidden");
          }
        } catch (err) {
          if (byosFeedbackBox) {
            byosFeedbackBox.className = "byos-feedback-box error";
            byosFeedbackBox.textContent = "Network error: " + err.message;
            byosFeedbackBox.classList.remove("hidden");
          }
        } finally {
          byosTestBtn.disabled = false;
          byosTestBtn.innerHTML = '<i data-lucide="activity"></i> <span>Test Connection</span>';
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    if (byosSaveBtn) {
      byosSaveBtn.addEventListener("click", async () => {
        const bucket = (byosBucketInput?.value || "").trim();
        const endpoint = (byosEndpointInput?.value || "").trim();
        const region = (byosRegionInput?.value || "us-east-1").trim();
        const accessKeyId = (byosAccessKeyInput?.value || "").trim();
        const secretAccessKey = (byosSecretKeyInput?.value || "").trim();

        if (selectedByosProvider !== "walrus" && (!bucket || !accessKeyId)) {
          alert("Bucket name and Access Key ID are required to activate BYOS.");
          return;
        }

        try {
          byosSaveBtn.disabled = true;
          byosSaveBtn.innerHTML = '<span class="spinner-sm"></span> Activating...';
          const token = localStorage.getItem("nodus_session_token");
          const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          };
          const res = await fetch("/api/tenant/storage-config", {
            method: "PUT",
            headers,
            body: JSON.stringify({
              provider: selectedByosProvider,
              endpoint: endpoint || null,
              bucket,
              region,
              accessKeyId: accessKeyId || undefined,
              secretAccessKey: secretAccessKey || undefined
            })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || "Failed to update storage provider");
          alert("Storage provider successfully activated: " + selectedByosProvider.toUpperCase());
          if (byosSecretKeyInput) byosSecretKeyInput.value = "";
          loadStorageConfig();
          loadUsage();
        } catch (err) {
          alert("Error saving BYOS settings: " + err.message);
        } finally {
          byosSaveBtn.disabled = false;
          byosSaveBtn.innerHTML = '<i data-lucide="check-circle-2"></i> <span>Save & Activate Provider</span>';
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    if (byosRevertBtn) {
      byosRevertBtn.addEventListener("click", async () => {
        if (!confirm("Revert storage engine to decentralized Walrus Protocol?")) return;
        try {
          const token = localStorage.getItem("nodus_session_token");
          const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          };
          const res = await fetch("/api/tenant/storage-config", {
            method: "PUT",
            headers,
            body: JSON.stringify({ provider: "walrus" })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || "Failed to revert provider");
          selectProviderCard("walrus");
          loadStorageConfig();
          loadUsage();
        } catch (err) {
          alert("Error reverting to Walrus: " + err.message);
        }
      });
    }
  }

  function initTeamRbac() {
    const teamNavBtn = document.getElementById("teamRbacNavBtn");
    const teamModal = document.getElementById("teamRbacModal");
    const teamCloseBtn = document.getElementById("teamRbacModalClose");
    const teamCloseFooterBtn = document.getElementById("teamRbacModalCloseBtn");
    const teamBackdrop = document.getElementById("teamRbacModalBackdrop");
    const inviteSubmitBtn = document.getElementById("inviteMemberSubmitBtn");
    const inviteAddressInput = document.getElementById("inviteMemberAddressInput");
    const inviteRoleSelect = document.getElementById("inviteMemberRoleSelect");

    async function loadMembers() {
      const tbody = document.getElementById("teamMembersTableBody");
      if (!tbody) return;
      try {
        const token = localStorage.getItem("nodus_session_token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch("/api/tenant/members", { headers });
        if (!res.ok) {
          tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Sign in to view organization members.</td></tr>`;
          return;
        }
        const data = await res.json();
        if (!data.success || !Array.isArray(data.members) || data.members.length === 0) {
          tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No members listed.</td></tr>`;
          return;
        }
        tbody.innerHTML = data.members.map(m => {
          const roleBadgeColor = m.role === "owner" ? "#10b981" : m.role === "admin" ? "#38bdf8" : "#818cf8";
          const addr = m.memberAddress || m.address || "Unknown";
          const shortAddr = addr.length > 16 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;
          const joined = m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : "--";
          const actionBtn = m.role === "owner"
            ? '<span style="font-size: 0.72rem; color: var(--text-muted);">Protected</span>'
            : `<button class="btn btn-sm btn-outline revoke-member-btn" data-address="${escapeHtml(addr)}">Revoke</button>`;

          return `
            <tr>
              <td><code title="${escapeHtml(addr)}">${escapeHtml(shortAddr)}</code></td>
              <td><span style="font-size: 0.75rem; font-weight: 600; color: ${roleBadgeColor}; text-transform: uppercase;">${escapeHtml(m.role)}</span></td>
              <td>${joined}</td>
              <td>${actionBtn}</td>
            </tr>
          `;
        }).join("");

        tbody.querySelectorAll(".revoke-member-btn").forEach(btn => {
          btn.addEventListener("click", async (ev) => {
            const addr = ev.currentTarget.getAttribute("data-address");
            if (!confirm(`Are you sure you want to revoke access for ${addr}? Their cryptographic key envelopes will be shredded immediately.`)) return;
            try {
              const token = localStorage.getItem("nodus_session_token");
              const res = await fetch(`/api/orgs/nodus-devs/members/${encodeURIComponent(addr)}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : {}
              });
              const data = await res.json();
              if (data.success) {
                if (data.keyRotationRequired) {
                  alert("Member removed. Warning: Cryptographic key envelopes were shredded. Pending key rotation tasks have been registered.");
                }
                loadMembers();
              } else {
                alert("Failed to remove member: " + data.error);
              }
            } catch (err) {
              alert("Error revoking member: " + err.message);
            }
          });
        });
      } catch (e) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Failed to load members.</td></tr>`;
      }
    }

    function openModal() {
      teamModal?.classList.remove("hidden");
      loadMembers();
      if (window.lucide) window.lucide.createIcons();
    }

    function closeModal() {
      teamModal?.classList.add("hidden");
    }

    if (teamNavBtn) teamNavBtn.addEventListener("click", openModal);
    if (teamCloseBtn) teamCloseBtn.addEventListener("click", closeModal);
    if (teamCloseFooterBtn) teamCloseFooterBtn.addEventListener("click", closeModal);
    if (teamBackdrop) teamBackdrop.addEventListener("click", closeModal);

    if (inviteSubmitBtn) {
      inviteSubmitBtn.addEventListener("click", async () => {
        const memberAddress = (inviteAddressInput?.value || "").trim();
        const role = inviteRoleSelect?.value || "viewer";
        if (!memberAddress || memberAddress.length < 32) {
          alert("Please enter a valid Solana public key address.");
          return;
        }

        try {
          inviteSubmitBtn.disabled = true;
          inviteSubmitBtn.innerHTML = '<span class="spinner-sm"></span> Inviting...';
          const token = localStorage.getItem("nodus_session_token");
          const res = await fetch("/api/tenant/members", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ memberAddress, role })
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || "Failed to invite member");

          inviteAddressInput.value = "";
          loadMembers();
        } catch (err) {
          alert("Error inviting member: " + err.message);
        } finally {
          inviteSubmitBtn.disabled = false;
          inviteSubmitBtn.innerHTML = '<i data-lucide="user-plus"></i> <span>Invite</span>';
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }
  }

  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#app") {
      showAppView(false);
    } else if (!window.location.hash || window.location.hash === "#" || window.location.hash === "#demo") {
      showLandingView(false);
    }
  });

  // Initial Boot
  applyTheme(currentTheme);
  updateAuthUI();
  applyLanguage(currentLang);
  fetchStatus();
  fetchPhotos();
  initLandingPlayground();
  initDeveloperPortal();
  initTeamRbac();

  // Initial View Determination & Deep-link Modal Handler
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const openModal = urlParams.get("open_modal");
    const appQuery = urlParams.get("app");
    if (window.location.hash === "#app" || appQuery === "true" || openModal) {
      showAppView(false);
    } else {
      showLandingView(false);
    }

    if (openModal === "zklogin") openZkLoginModal();
    else if (openModal === "google") openGoogleZkModal();
    else if (openModal === "wallets") openWalletSelectorModal();
    else if (openModal === "seed") openSeedPhraseModal();
    else if (openModal === "solana") openSolanaWalletModal();
  } catch (e) {
    console.warn("View router / modal auto-open error:", e);
    showLandingView(false);
  }
});
