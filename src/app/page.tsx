'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const formMethods = useForm();

  const onSubmit = async (data: any) => {
    console.log("inputs: ", data);
    await fetch("https://n8nhook.acad.bchat.lat/webhook/scraping-linkedln", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  };

  return (
    <div className="h-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>Pesquisa de Perfis no Linkedln</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-3 w-[100%]">
              
              <Input {...formMethods.register("profissao", {required: "Profissão é obrigatória!"})} placeholder="Profissão"/>
              {formMethods.formState.errors.profissao && <p className="text-red-500 text-sm">{String(formMethods.formState.errors.profissao.message)}</p>}

              <Controller 
              name="areaAtuacao"
              control={formMethods.control}
              rules={{ required: "Área de atuação é obrigatória!" }}
              render={({field}) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a área de atuação"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administration">Administração</SelectItem>
                    <SelectItem value="communication">Comunicação</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="finance">Financeiro</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="technology">Tecnologia</SelectItem>
                  </SelectContent>
                </Select>
              )}
              />
              {formMethods.formState.errors.areaAtuacao && <p className="text-red-500 text-sm">{String(formMethods.formState.errors.areaAtuacao.message)}</p>}

              <Input {...formMethods.register("localizacao", {required: "Localização é obrigatória!"})} placeholder="Localização"/>
              {formMethods.formState.errors.localizacao && <p className="text-red-500 text-sm">{String(formMethods.formState.errors.localizacao.message)}</p>}

              <div className="flex justify-center">
                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
