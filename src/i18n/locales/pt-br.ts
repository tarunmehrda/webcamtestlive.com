import type { Dict } from '../schema';

/**
 * Brazilian Portuguese. "teste de webcam" and "testar webcam" are the high-volume
 * forms; "câmera" (with the circumflex) is the Brazilian spelling pt-PT uses
 * "câmara", which is why this locale is pt-BR rather than a generic pt.
 */
export const ptBr = {
  seo: {
    primaryKeyword: 'teste de webcam',
    keywords: ['testar webcam', 'teste de câmera', 'câmera online', 'testar câmera online'],
  },

  meta: {
    homeTitle: 'Teste de Webcam: Teste sua câmera e microfone online grátis',
    homeDescription:
      'Teste de webcam online grátis. Verifique sua câmera e microfone no navegador, resolução, FPS, bitrate e qualidade de imagem. Sem download, sem cadastro, nada é enviado.',
  },

  nav: {
    home: 'Teste de Webcam',
    resolution: 'Resolução',
    fps: 'FPS',
    micTest: 'Microfone',
    troubleshooting: 'Solução de problemas',
    faq: 'Perguntas frequentes',
    about: 'Sobre',
    contact: 'Contato',
    privacy: 'Privacidade',
    terms: 'Termos',
    language: 'Mudar idioma',
    openMenu: 'Abrir menu',
    startTest: 'Iniciar teste',
    toggleTheme: 'Alternar modo escuro',
  },

  hero: {
    eyebrow: '100% privado · roda no seu navegador',
    title: 'Teste de webcam em segundos.',
    subtitle:
      'Visualize sua câmera, meça resolução e taxa de quadros e faça verificações instantâneas antes da próxima chamada. Nada sai do seu dispositivo.',
    trust: {
      noDownloads: 'Sem download',
      noSignup: 'Sem cadastro',
      runsInBrowser: 'Roda no navegador',
      nothingUploaded: 'Nada é enviado',
    },
  },

  tool: {
    startTest: 'Iniciar teste',
    stop: 'Parar',
    idleTitle: 'A imagem da sua câmera aparece aqui',
    idleNote: 'Nada é enviado, o teste roda no seu dispositivo.',
    howToFix: 'Como resolver isso →',
    live: 'AO VIVO',
    mirror: 'Espelhar imagem',
    framingGuides: 'Guias de enquadramento',
    record: 'Gravar um clipe curto',
    snapshot: 'Capturar foto',
    fullscreen: 'Tela cheia',
    camera: 'Câmera',
    microphone: 'Microfone',
    defaultCamera: 'Câmera padrão',
    defaultMicrophone: 'Microfone padrão',
    eyeLine: 'linha dos olhos',

    info: {
      title: 'Informações da webcam',
      idle: 'Inativo',
      live: 'Ao vivo',
      groupDevice: 'Dispositivo',
      groupVideo: 'Vídeo',
      groupImage: 'Imagem',
      name: 'Nome da webcam',
      quality: 'Qualidade',
      builtInMic: 'Microfone',
      builtInSpeaker: 'Alto-falante',
      resolution: 'Resolução',
      maxSupported: 'Máximo suportado',
      videoStandard: 'Padrão',
      frameRate: 'Taxa de quadros',
      megapixels: 'Megapixels',
      aspectRatio: 'Proporção',
      streamType: 'Tipo de stream',
      bitrate: 'Bitrate',
      pngSize: 'Quadro PNG',
      jpegSize: 'Quadro JPEG',
      imageMode: 'Modo de imagem',
      colours: 'Cores',
      averageRgb: 'Cor média',
      lightness: 'Claridade',
      luminosity: 'Luminosidade',
      brightness: 'Brilho',
      contrast: 'Contraste',
      hue: 'Matiz',
      saturation: 'Saturação',
      note: 'Medido ao vivo no seu dispositivo, nada é enviado. A contagem de cores vem de uma amostra 160×90 do quadro atual; os tamanhos de arquivo são o quadro atual codificado em resolução total. Use {copyReport} para salvar ou compartilhar esses números.',
    },

    healthChecks: {
      title: 'Verificações',
      copyReport: 'Copiar relatório',
      copied: 'Copiado',
      selectAndCopy: 'Selecione e copie',
      idle: 'Inicie o teste para rodar as verificações automáticas.',
    },

    cameraControls: {
      title: 'Controles da câmera',
      subtitle: 'Ajuste a câmera em si, não apenas a imagem na tela.',
      reset: 'Redefinir',
      idle: 'Inicie o teste para ver quais controles sua câmera suporta.',
      unsupported:
        'Esta câmera não expõe controles ajustáveis ao seu navegador. Isso é comum em webcams integradas de notebook, e é uma limitação do navegador, não um defeito.',
      torch: 'Lanterna',
      on: 'Ligada',
      off: 'Desligada',
    },

    mic: {
      title: 'Microfone',
      off: 'Desligado',
      prompt: 'Fale para ver seu nível de entrada. Começa junto com o teste da câmera.',
      meterTitle: 'Nível do microfone',
      meterSubtitle: 'Fale e veja a barra responder. O áudio é analisado somente no seu dispositivo.',
      idle: 'Inativo',
      listening: 'Ouvindo',
    },

    speakers: {
      title: 'Alto-falantes',
      idle: 'Inativo',
      prompt:
        'Toque um som de teste para verificar cada lado. Use fones para distinguir esquerda e direita.',
      left: 'Esquerda',
      both: 'Ambos',
      right: 'Direita',
      lr: 'L + R',
      playing: 'Tocando',
      unavailable: 'Indisponível',
      blocked: 'Bloqueado',
      hint: 'Fones revelam esquerda e direita. Aperte o mesmo botão de novo para parar.',
      toneLabel: 'Tom',
      toneLow: 'Grave',
      toneLowNote: '120 Hz resposta de graves',
      toneMid: 'Médio',
      toneMidNote: '440 Hz faixa da voz',
      toneHigh: 'Agudo',
      toneHighNote: '2 kHz clareza e chiado',
    },

    recording: {
      title: 'Veja o que os outros veem',
      note: 'Reproduzido do seu dispositivo. Nunca é enviado.',
      download: 'Baixar',
      discard: 'Descartar',
    },
  },

  home: {
    howItWorks: {
      title: 'Três passos, cerca de um minuto.',
      subtitle:
        'Não há nada para instalar nem cadastro a fazer. A câmera abre, os números aparecem e você fecha a aba.',
      steps: [
        {
          name: 'Clique em “Iniciar teste”',
          text: 'Sem download, sem plugin, sem conta. O teste abre sua câmera pela API de mídia padrão do navegador, exatamente como uma videochamada faria.',
        },
        {
          name: 'Permita o acesso à câmera',
          text: 'Seu navegador pede permissão, ele sempre pede, para todo site. Escolha Permitir e sua prévia aparece em um ou dois segundos.',
        },
        {
          name: 'Leia seus resultados',
          text: 'Resolução, taxa de quadros, proporção e iluminação são medidas ao vivo, e tudo que ficaria ruim numa chamada é sinalizado com uma correção específica.',
        },
      ],
    },

    checks: {
      title: 'O que o teste realmente verifica.',
      subtitle:
        'Ver o próprio rosto confirma que a câmera liga. Estes são os fatores que decidem se você aparece e soa bem para todo mundo.',
      items: [
        {
          title: 'Resolução',
          body: 'Sua resolução ao vivo e o máximo que sua câmera suporta, para você saber se está recebendo a qualidade que pagou.',
        },
        {
          title: 'Taxa de quadros',
          body: 'Contada a partir dos quadros que seu navegador realmente exibe, e não do número impresso na caixa.',
        },
        {
          title: 'Proporção',
          body: 'Se sua câmera entrega o formato 16:9 que os apps de conferência esperam, ou uma imagem 4:3 que eles vão cortar.',
        },
        {
          title: 'Bitrate',
          body: 'Medido codificando uma amostra curta, então o número reflete o que sua câmera realmente produz.',
        },
        {
          title: 'Qualidade de imagem',
          body: 'Brilho, contraste, saturação e contagem de cores são amostrados ao vivo, e sinalizamos uma imagem escura demais ou estourada.',
        },
        {
          title: 'Microfone',
          body: 'Um medidor de entrada ao vivo mostra o que os outros ouviriam, para você ajustar o nível antes que alguém esteja escutando.',
        },
        {
          title: 'Alto-falantes',
          body: 'Um som de teste nos canais esquerdo e direito confirma que a outra metade da chamada funciona.',
        },
        {
          title: 'Gravar e reproduzir',
          body: 'Grave alguns segundos e assista, a única forma honesta de ver o que as outras pessoas veem.',
        },
        {
          title: 'Permissões e dispositivos',
          body: 'Confirma que o navegador concedeu acesso por conexão segura e lista todas as câmeras e microfones para alternar.',
        },
      ],
    },

    subTools: {
      title: 'Aprofunde em qualquer aspecto.',
      subtitle: 'Ferramentas específicas para as verificações que mais importam antes de uma reunião ou live.',
      openTool: 'Abrir ferramenta',
      resolution: {
        title: 'Teste de resolução',
        body: 'Veja sua resolução atual e a máxima suportada, e se ela está pronta para HD.',
      },
      fps: {
        title: 'Teste de FPS',
        body: 'Meça a taxa de quadros real a partir dos quadros que seu navegador realmente exibe.',
      },
      mic: {
        title: 'Teste de microfone',
        body: 'Verifique seu microfone com um medidor de nível ao vivo, sem precisar entrar numa chamada.',
      },
    },

    notWorking: {
      eyebrow: 'A câmera não funciona?',
      title: 'Quatro causas explicam quase todas as falhas.',
      body: 'Uma permissão bloqueada, outro app segurando a câmera, o dispositivo errado selecionado, ou uma tampa de privacidade sobre a lente. Nosso guia de solução de problemas percorre cada uma, com o caminho exato das configurações para todos os navegadores principais e para Windows e macOS.',
      cta: 'Abrir o guia de soluções',
    },

    privacyStrip: {
      eyebrow: 'Privacidade por padrão',
      title: 'O vídeo da sua câmera nunca sai do seu dispositivo.',
      body: 'Cada verificação roda localmente no seu navegador usando APIs web padrão. Nunca recebemos, armazenamos ou transmitimos seu vídeo ou áudio, e o clipe opcional que você pode gravar fica no seu navegador, no seu próprio dispositivo.',
      cta: 'Leia nossa abordagem de privacidade',
    },

    faq: {
      title: 'Perguntas frequentes sobre teste de webcam',
      more: 'Mais perguntas respondidas nas',
      moreLinkText: 'perguntas frequentes completas sobre teste de webcam',
      items: [
        {
          q: 'Este teste de webcam é seguro e privado?',
          a: 'Sim. Todo o teste roda dentro do seu navegador e seu vídeo nunca sai do seu dispositivo, nada é enviado a nenhum servidor, e não existe servidor que pudesse receber sua imagem mesmo que quiséssemos. O clipe opcional que você pode gravar fica no seu navegador e é descartado quando você termina.',
        },
        {
          q: 'Preciso instalar alguma coisa?',
          a: 'Não. Não há nada para baixar, nenhum plugin, nenhuma extensão e nenhum cadastro. Abra a página, clique em “Iniciar teste” e permita o acesso à câmera quando o navegador pedir.',
        },
        {
          q: 'Por que o navegador pede permissão?',
          a: 'Os navegadores exigem sua permissão explícita antes que qualquer site use a câmera ou o microfone, é uma proteção nativa, não algo que controlamos. Só pedimos acesso enquanto você está testando, e você pode revogá-lo a qualquer momento pelo ícone na barra de endereços.',
        },
        {
          q: 'Minha câmera não aparece, o que fazer?',
          a: 'Feche qualquer outro app que possa estar segurando a câmera (Zoom, Teams, Meet, OBS), confirme que a câmera está conectada e sem tampa de privacidade, e verifique se você permitiu o acesso pelo ícone da barra de endereços. Recarregue e tente de novo. Nosso guia de solução de problemas percorre cada causa passo a passo.',
        },
        {
          q: 'Quais navegadores e dispositivos são suportados?',
          a: 'Todos os navegadores modernos funcionam: Chrome, Edge, Firefox, Safari, Opera e Brave, no Windows, macOS, Linux, Android e iOS. A página precisa ser servida por HTTPS, esta é, e é por isso que a câmera consegue iniciar.',
        },
        {
          q: 'O que significam as verificações?',
          a: 'Assim que sua câmera inicia, avaliamos resolução, taxa de quadros, proporção, permissões e brilho da imagem, e sinalizamos tudo que ficaria ruim numa chamada. Cada aviso vem com uma correção específica, não um alerta genérico.',
        },
        {
          q: 'Testar aqui bloqueia minha câmera em outros apps?',
          a: 'Apenas enquanto o teste está rodando, a maioria dos sistemas permite que apenas uma página ou app use a câmera por vez. Aperte “Parar” quando terminar e a câmera é liberada imediatamente, a luz indicadora apaga e o Zoom ou Teams pode usá-la de novo.',
        },
        {
          q: 'O clipe gravado é enviado para algum lugar?',
          a: 'Não. O clipe “veja o que os outros veem” é gravado pelo seu navegador na memória do seu próprio dispositivo e reproduzido de lá. Ele é descartado quando você aperta Descartar, grava de novo, para o teste ou fecha a aba, e só chega ao seu disco se você escolher Baixar.',
        },
        {
          q: 'Posso testar meus alto-falantes e fones aqui também?',
          a: 'Sim. O painel Alto-falantes toca um som curto de teste pelo canal esquerdo, pelo direito ou por ambos, o que confirma que a outra metade da chamada funciona. Use fones se quiser distinguir esquerda e direita com segurança.',
        },
        {
          q: 'Para que servem as guias de enquadramento?',
          a: 'Elas sobrepõem linhas da regra dos terços e um marcador de linha dos olhos na sua prévia. Alinhar os olhos com a linha superior e deixar um pouco de espaço acima da cabeça é a forma mais rápida de transformar uma imagem de webcam acidental em uma imagem que parece intencional.',
        },
        {
          q: 'Posso testar minha webcam antes de uma entrevista ou reunião?',
          a: 'É exatamente para isso que serve. Rode o teste alguns minutos antes para confirmar que a câmera certa está selecionada, que a imagem está nítida e bem iluminada e que o nível do microfone responde quando você fala, tudo sem entrar numa chamada e se expor.',
        },
      ],
    },
  },

  footer: {
    blurb:
      'Um teste de webcam e microfone rápido e privado. Tudo roda no seu navegador seu vídeo nunca sai do seu dispositivo.',
    tools: 'Ferramentas',
    guides: 'Guias',
    site: 'Site',
    rights: 'Todos os direitos reservados.',
    strapline: '100% no cliente · sem uploads · sem rastreamento do seu vídeo',
  },
} satisfies Dict;
