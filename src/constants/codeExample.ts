export const codeExample = `
class j0eText
{
  idc=-1;
  type=0;
  style=2;
  colorText[]={1,1,1,1};
  colorBackground[]={0,0,0,0.2};
  font="CourierNewB64";
  sizeEx=0.020;
};
class j0eButton
{
  idc=-1;
  type=11;
  style=2;
  color[]={1,1,1,1};
  colorActive[]={0,1,0,1};
  font="CourierNewB64";
  sizeEx=0.020;
  soundEnter[]={"ui\\ui_over",0.2,1};
  soundPush[]={"",0.2,1};
  soundClick[]={"ui\\ui_ok",0.2,1};
  soundEscape[]={"ui\\ui_cc",0.2,1};
  default=0;
};
class j0eComboBox
{
  idc=-1;
  type=4;
  style=0;
  colorText[]={1,1,1,1};
  colorBackground[]={0.5,0.5,0.5,1};
  colorSelect[]={0.5,0.5,0.5,1};
  colorSelectBackground[]={0.2,0.2,0.2,1};
  font="CourierNewB64";
  sizeEx=0.020;
  rowHeight=0.030;
  wholeHeight=0.360;
};
class j0eSlider
{
  idc=-1;
  type=3;
  style=0x0F;
  color[]={1,1,1,1};
  sizeEx=0.020;
};
class j0eEditBox
{
  idc=-1;
  type=2;
  style=0;
  colorText[]={1,0,0,1};
  colorSelection[]={0.5,0.5,0.5,1};
  font="CourierNewB64";
  sizeEx=0.020;
  autocomplete=0;
  text="";
};
class j0eReviveDialog
{
  idd=21000;
  movingEnable=0;
  controls[]={"ButtonNEXT","ButtonPREV","ButtonRESET","ComboPLAYERS","TextREVIVE","TextPLAYER",
              "SliderANGLE","SliderDISTN","SliderHEIGH","TextANGLE","TextDISTN","TextHEIGH",
              "ComboMOD","ButtonMOD","EditMOD"};
  class ButtonNEXT: j0eButton
  {
    idc=21007;
    x=0.250; y=0.005; w=0.060; h=0.030;
    text="Next";
    action="{nx} Exec {j0e_pack\\revive\\climnu.sqs}";
  };
  class ButtonPREV: j0eButton
  {
    idc=21008;
    x=0.250; y=0.040; w=0.060; h=0.030;
    text="Prev";
    action="{pr} Exec {j0e_pack\\revive\\climnu.sqs}";
  };
  class ButtonRESET: j0eButton
  {
    idc=21009;
    x=0.250; y=0.075; w=0.060; h=0.030;
    text="Reset";
    action="{rs} Exec {j0e_pack\\revive\\climnu.sqs}";
  };
  class ComboPLAYERS: j0eComboBox
  {
    idc=21001;
    x=0.005; y=0.005; w=0.240; h=0.030;
  };
  class TextREVIVE: j0eText
  {
    idc=21002;
    x=0.320; y=0.005; w=0.090; h=0.030;
    text="-";
  };
  class TextPLAYER: j0eText
  {
    idc=21003;
    x=0.005; y=0.040; w=0.240; h=0.030;
    text="<UNK>";
  };
  class SliderANGLE: j0eSlider
  {
    idc=21004;
    x=0.005; y=0.075; w=0.185; h=0.030;
  };
  class SliderDISTN: j0eSlider
  {
    idc=21005;
    x=0.005; y=0.110; w=0.185; h=0.030;
  };
  class SliderHEIGH: j0eSlider
  {
    idc=21006;
    x=0.005; y=0.145; w=0.185; h=0.030;
  };
  class TextANGLE: j0eText
  {
    idc=21014;
    x=0.195; y=0.075; w=0.045; h=0.030;
    text="-";
  };
  class TextDISTN: j0eText
  {
    idc=21015;
    x=0.195; y=0.110; w=0.045; h=0.030;
    text="-";
  };
  class TextHEIGH: j0eText
  {
    idc=21016;
    x=0.195; y=0.145; w=0.045; h=0.030;
    text="-";
  };
  class ComboMOD: j0eComboBox
  {
    idc=21061;
    colorText[]={1,0,0,1};
    x=0.415; y=0.005; w=0.120; h=0.030;
  };
  class ButtonMOD: j0eButton
  {
    idc=21062;
    color[]={1,0,0,1};
    x=0.540; y=0.005; w=0.090; h=0.030;
    text="Moderate";
    action="0 Exec {j0e_pack\\revive\\modmnu.sqs}";
  };
  class EditMOD: j0eEditBox
  {
    idc=21063;
    x=0.415; y=0.040; w=0.480; h=0.030;
  };
};
`;
