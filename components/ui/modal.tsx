'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export function Modal({title,children,onClose}:{title:string;children:React.ReactNode;onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const el=ref.current;el?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{el?.close();document.body.style.overflow=old;};},[]);
 return <dialog ref={ref} className="modal" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}} aria-labelledby="modal-title"><div className="modal-head"><h3 id="modal-title">{title}</h3><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={21}/></button></div><div className="modal-content">{children}</div></dialog>;
}
