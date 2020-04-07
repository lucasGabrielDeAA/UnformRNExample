# RN Unform & Keyboard

This project contain a react-native's implementation of [Unform](https://unform.dev/)

## Running the application

First of all, you have to install all the dependencies.

```
  yarn install
  or npm install
```

For IOS's environment, you need to install the `cocoa pods`, using the following command.

```
 cd ios/ && pod install && cd ..
```

Then you run

```
  yarn android - For Android's environment
  yarn ios - For IOS's environment
```

![Android screenshot](/images/android.png)
![IOS screenshot](/images/ios.png)

## KeyboardScroll Page

Página criada para testar o controle do teclado com vários inputs utilizando o `KeyboardController` e criando um componente de form personalizado.

## KeyboardToolBox

Página criada para testar a **"caixa de ações"** que fica acima do teclado (quando aberto) e validar o `KeyboardController` utilizando o `LayoutAnimation` para criar uma animação que acompanha a abertura do teclado.

## Strava Form Example

Página inspirada no app Strava que visa criar um formulário mais **"amigável"**, aplicando o controle do teclado e criando componentes novos para `Inputs` e `Select`.

## Whatsapp ToolBox Example

Página de chat que possui um input na toolbox do teclado. Essa toolbox tem posicionamento absoluto e acompanha a animação do teclado. Conforme o tamanho do texto, a toolbox aumenta sua altura até o limite de **150px** (igual aos apps de chat). 
